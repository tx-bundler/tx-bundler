// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BasicLending is Ownable, ReentrancyGuard {
    IERC20 public usdcToken;

    uint256 public etherToUsdcRate = 2000; // 1 Ether = 2000 USDC (example rate)
    uint256 constant DECIMALS = 10**6; // USDC has 6 decimal places

    struct LiquidityPool {
        uint256 totalShares;
        uint256 totalEther;
        uint256 totalUsdc;
    }

    struct UserBalance {
        uint256 shares;
        uint256 borrowedEther;
        uint256 depositedEther;
        uint256 borrowedUsdc;
        uint256 depositedUsdc;
    }

    LiquidityPool public pool;

    mapping(address => UserBalance) public userBalances;

    event Deposited(address indexed user, uint256 etherAmount, uint256 usdcAmount);
    event BorrowedEther(address indexed user, uint256 amount);
    event BorrowedUsdc(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 etherAmount, uint256 usdcAmount);
    event UsdcWithdrawn(address indexed user, uint256 usdcAmount);
    event EtherWithdrawn(address indexed user, uint256 etherAmount);
    event EtherRepaid(address indexed user, uint256 etherAmount);
    event UsdcRepaid(address indexed user, uint256 usdcAmount);
    event EtherToUsdcRateUpdated(uint256 newRate);


    constructor(IERC20 _usdcToken) Ownable() {
        usdcToken = _usdcToken;
    }

    receive() external payable {
        revert("Direct Ether transfers not allowed.");
    }

    fallback() external payable {
        revert("Fallback not allowed.");
    }

    function updateEtherToUsdcRate(uint256 newRate) onlyOwner external {
        require(newRate > 0, "Invalid rate.");
        etherToUsdcRate = newRate;
        emit EtherToUsdcRateUpdated(newRate);
    }

    function deposit(uint256 usdcAmount) external payable nonReentrant {
        require(msg.value > 0 || usdcAmount > 0, "No value sent!");

        uint256 totalValueInUsdc = msg.value * etherToUsdcRate / DECIMALS + usdcAmount;
        uint256 newShares;
        
        if (pool.totalShares == 0) {
            newShares = totalValueInUsdc;
        } else {
            uint256 poolValue = pool.totalEther * etherToUsdcRate + pool.totalUsdc;
            newShares = totalValueInUsdc * pool.totalShares / poolValue;
        }

        if (msg.value > 0) {
            pool.totalEther += msg.value;
            userBalances[msg.sender].depositedEther += msg.value;
        }

        if (usdcAmount > 0) {
            usdcToken.transferFrom(msg.sender, address(this), usdcAmount);
            userBalances[msg.sender].depositedUsdc += usdcAmount;
            pool.totalUsdc += usdcAmount;
        }

        userBalances[msg.sender].shares += newShares;
        pool.totalShares += newShares;
        emit Deposited(msg.sender, msg.value, usdcAmount);
    }

    function withdraw(uint256 shares, bool isUsdc) external nonReentrant {
        require(shares > 0, "Invalid shares amount.");
        require(userBalances[msg.sender].shares >= shares, "Insufficient shares.");

        uint256 poolValue = pool.totalEther * etherToUsdcRate + pool.totalUsdc;
        uint256 withdrawalValueInUsdc = shares * poolValue / pool.totalShares;
        uint256 etherAmount = withdrawalValueInUsdc * DECIMALS / etherToUsdcRate;
        uint256 usdcAmount = withdrawalValueInUsdc - etherAmount * etherToUsdcRate / DECIMALS;

        if (isUsdc) {
            require(pool.totalUsdc >= usdcAmount, "Insufficient USDC in the pool.");
            usdcToken.transfer(msg.sender, usdcAmount);
            pool.totalUsdc -= usdcAmount;

            userBalances[msg.sender].shares -= shares;
            pool.totalShares -= shares;

            userBalances[msg.sender].depositedUsdc -= usdcAmount;
            userBalances[msg.sender].depositedEther -= etherAmount;

            emit UsdcWithdrawn(msg.sender, usdcAmount);
        } else {
            require(pool.totalEther >= etherAmount, "Insufficient Ether in the pool.");
            (bool success, ) = msg.sender.call{value: etherAmount}("");
            require(success, "Failed to send Ether.");
            pool.totalEther -= etherAmount;

            userBalances[msg.sender].shares -= shares;
            pool.totalShares -= shares;

            userBalances[msg.sender].depositedEther -= etherAmount;
            userBalances[msg.sender].depositedUsdc -= usdcAmount;

            emit EtherWithdrawn(msg.sender, etherAmount);
        }
    }

    function borrowEther(uint256 usdcAmount) external nonReentrant {
        require(usdcAmount > 0, "Invalid USDC amount.");
        uint256 etherAmount = usdcAmount * DECIMALS / etherToUsdcRate;
        require(pool.totalEther >= etherAmount, "Insufficient Ether in the pool.");

        usdcToken.transferFrom(msg.sender, address(this), usdcAmount);
        userBalances[msg.sender].depositedUsdc += usdcAmount;
        pool.totalUsdc += usdcAmount;

        (bool success, ) = msg.sender.call{value: etherAmount}("");
        require(success, "Failed to send Ether.");
        pool.totalEther -= etherAmount;

        userBalances[msg.sender].borrowedEther += etherAmount;

        emit BorrowedEther(msg.sender, etherAmount);
    }

    function borrowUsdc(uint256 etherAmount) external payable nonReentrant {
        require(etherAmount > 0, "Invalid Ether amount.");
        require(msg.value >= etherAmount, "Incorrect Ether amount sent.");
        uint256 usdcAmount = etherAmount * etherToUsdcRate / DECIMALS;
        require(pool.totalUsdc >= usdcAmount, "Insufficient USDC in the pool.");
        userBalances[msg.sender].depositedEther += msg.value;

        pool.totalEther += etherAmount;

        usdcToken.transfer(msg.sender, usdcAmount);
        pool.totalUsdc -= usdcAmount;

        userBalances[msg.sender].borrowedUsdc += usdcAmount;
        emit BorrowedUsdc(msg.sender, usdcAmount);
    }

    function repayEther(uint256 etherAmount) external payable nonReentrant {
        require(etherAmount > 0, "Invalid Ether amount.");
        require(msg.value >= etherAmount, "Incorrect Ether amount sent.");
        require(userBalances[msg.sender].borrowedEther >= etherAmount, "Repaying more than borrowed.");

        userBalances[msg.sender].borrowedEther -= etherAmount;
        pool.totalEther += etherAmount;

        if (userBalances[msg.sender].borrowedEther == 0) {
            uint256 borrowedUsdc = userBalances[msg.sender].borrowedUsdc;
            userBalances[msg.sender].borrowedUsdc = 0;
            usdcToken.transfer(msg.sender, borrowedUsdc);
        }

        emit EtherRepaid(msg.sender, etherAmount);
    }

    function repayUsdc(uint256 usdcAmount) external nonReentrant {
        require(usdcAmount > 0, "Invalid USDC amount.");
        require(userBalances[msg.sender].borrowedUsdc >= usdcAmount, "Repaying more than borrowed.");

        usdcToken.transferFrom(msg.sender, address(this), usdcAmount);
        userBalances[msg.sender].borrowedUsdc -= usdcAmount;
        pool.totalUsdc += usdcAmount;

        if (userBalances[msg.sender].borrowedUsdc == 0) {
            uint256 borrowedEther = userBalances[msg.sender].borrowedEther;
            userBalances[msg.sender].borrowedEther = 0;
            (bool success, ) = msg.sender.call{value: borrowedEther}("");
            require(success, "Failed to send Ether.");
        }

        emit UsdcRepaid(msg.sender, usdcAmount);
    }
}
