const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const hre = require("hardhat");

describe("BasicLending", function () {
  let usdcToken: any;
  let basicLending: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any[];

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy USDC mock token
    const ERC20Mock = await hre.ethers.getContractFactory("ERC20Mock");
    usdcToken = await ERC20Mock.deploy("USD Coin", "USDC", 6);
    await usdcToken.deployed();

    // Deploy BasicLending contract
    const BasicLending = await ethers.getContractFactory("BasicLending");
    basicLending = await BasicLending.deploy(usdcToken.address);
    await basicLending.deployed();

  });

  // Test cases
  it("Owner should be able to update etherToUsdcRate", async function () {
    await expect(basicLending.connect(owner).updateEtherToUsdcRate(2500))
      .to.emit(basicLending, "EtherToUsdcRateUpdated")
      .withArgs(2500);
    expect(await basicLending.etherToUsdcRate()).to.equal(2500);
  });

  it("Non-owner should not be able to update etherToUsdcRate", async function () {
    await expect(basicLending.connect(addr1).updateEtherToUsdcRate(2500)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should deposit USDC into the contract", async function () {
    // Mint some USDC for addr1
    await usdcToken.mint(addr1.address, ethers.utils.parseUnits("1000", 6));
    await usdcToken.connect(addr1).approve(basicLending.address, ethers.utils.parseUnits("1000", 6));

    // Deposit USDC
    await expect(
      basicLending.connect(addr1).deposit(ethers.utils.parseUnits("1000", 6))
    )
      .to.emit(basicLending, "Deposited")
      .withArgs(addr1.address, ethers.utils.parseEther("0"), ethers.utils.parseUnits("1000", 6));
  });

  it("Should deposit Ether into the contract", async function () {

    // Deposit Ether
    await expect(
      basicLending.connect(addr1).deposit(ethers.utils.parseUnits("0", 6), {value: ethers.utils.parseEther("2")})
    )
      .to.emit(basicLending, "Deposited")
      .withArgs(addr1.address, ethers.utils.parseEther("2"), ethers.utils.parseUnits("0", 6));
  });
});