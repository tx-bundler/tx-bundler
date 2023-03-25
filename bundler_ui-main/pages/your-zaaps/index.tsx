import {
  Box,
  Button,
  Container,
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Input,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import SwapModal from "../../components/SwapModal";
import SwapTableModal from "../../components/SwapTableModal";
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { IEthereumProvider } from "@argent/login-react";
import * as zksync from "zksync-web3";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContract,
  useBalance,
  useContractRead,
  useProvider,
  useSigner,
} from "wagmi";
import { VaultAbi } from "../../constants/abis/VaultAbi";
import { PoolAbi } from "../../constants/abis//PoolAbi";
import { RouterAbi } from "../../constants/abis/RouterAbi";
import { factoryAbi } from "../../constants/abis/PoolFactory";
import { testAbi } from "../../constants/abis/testAbi";
import { LendingAbi } from "@/constants/abis/LendingAbi";

export default function Swap() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();

  const LENDING_ADDRESS = "0xA7c9A38e77290420eD06cf54d27640dE27399eB1";

  const WETH_ADDRESS = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";
  const DAI_ADDRESS = "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b";
  const DAI_DECIMALS = 18;
  const VAULT_CONTRACT_ADDRESS = "0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8";
  const POOL_ADDRESS = "0xe52940eDDa6ec5FDabef7C33B9C1E1d613BbA144"; // ETH/DAI
  const ROUTER_ADDRESS = "0xB3b7fCbb8Db37bC6f572634299A58f51622A847e"; // Swap Contract
  const POOLFACTORY_ADDRESS = "0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006"; // Classic
  const ADDRESS_ZERO = ethers.constants.AddressZero;
  const ercAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function deposit() public payable",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];

  /* 
   ___   ____   ___   ___   ____  _      __  ____ ______ __ __ ____ ___            _  __   __     __  __ ____ ___   _____
  / _ ) / __ \ / _ \ / _ \ / __ \| | /| / / / __//_  __// // // __// _ \  _    __ (_)/ /_ / /    / / / // __// _ \ / ___/
 / _  |/ /_/ // , _// , _// /_/ /| |/ |/ / / _/   / /  / _  // _/ / , _/ | |/|/ // // __// _ \  / /_/ /_\ \ / // // /__  
/____/ \____//_/|_|/_/|_| \____/ |__/|__/ /___/  /_/  /_//_//___//_/|_|  |__,__//_/ \__//_//_/  \____//___//____/ \___/  
*/
  const [usdcAmount, setUsdcAmount] = useState(0);

  const { config: config2 } = usePrepareContractWrite({
    address: LENDING_ADDRESS,
    abi: LendingAbi,
    functionName: "borrowEther",
    args: [usdcAmount],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    write: write2,
  } = useContractWrite(config2);

  /*
   ___    ___   ___   ___   ____  _   __ ____  _      __ ____ ______ __ __  
  / _ |  / _ \ / _ \ / _ \ / __ \| | / // __/ | | /| / // __//_  __// // /  
 / __ | / ___// ___// , _// /_/ /| |/ // _/   | |/ |/ // _/   / /  / _  /   
/_/ |_|/_/   /_/   /_/|_| \____/ |___//___/   |__/|__//___/  /_/  /_//_/    
*/

  const MAX_APPROVE =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

  const { config: config1 } = usePrepareContractWrite({
    address: WETH_ADDRESS,
    abi: ercAbi,
    functionName: "approve",
    args: [ROUTER_ADDRESS, MAX_APPROVE],
  });
  const {
    data: data1,
    isLoading: isLoading1,
    isSuccess: isSuccess1,
    write: write1,
  } = useContractWrite(config1);

  async function handleApprove() {
    write1?.();
  }

  /* 
   ____ _      __ ___    ___    ____ ______ __ __ ____ ___    ______ ____    ___   ___    ____          _  __   __     ______  __ _  __ _____ ____ _      __ ___    ___ 
  / __/| | /| / // _ |  / _ \  / __//_  __// // // __// _ \  /_  __// __ \  / _ \ / _ |  /  _/ _    __ (_)/ /_ / /    / __/\ \/ // |/ // ___// __/| | /| / // _ |  / _ \
 _\ \  | |/ |/ // __ | / ___/ / _/   / /  / _  // _/ / , _/   / /  / /_/ / / // // __ | _/ /  | |/|/ // // __// _ \  _\ \   \  //    // /__ _\ \  | |/ |/ // __ | / ___/
/___/  |__/|__//_/ |_|/_/    /___/  /_/  /_//_//___//_/|_|   /_/   \____/ /____//_/ |_|/___/  |__,__//_/ \__//_//_/ /___/   /_//_/|_/ \___//___/  |__/|__//_/ |_|/_/    
*/

  // const { account } = useWeb3React(); // get the current user's wallet address

  // const provider = new ethers.providers.Web3Provider(ethereumProvider);

  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const { data: account, isError, isLoading } = useAccount({ provider });

  const {
    data: signer,
    isError: signerIsError,
    isLoading: signerIsLoading,
  } = useSigner({ provider, account });

  const contract = useContract({
    address: ROUTER_ADDRESS,
    abi: RouterAbi,
    signer,
  });

  const Router = new ethers.Contract(ROUTER_ADDRESS, RouterAbi, signer);

  const value = ethers.utils.parseEther("0.00001");

  const withdrawMode = 2; // 1 or 2 to withdraw to user's wallet

  const swapData = account
    ? ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "uint8"],
        [WETH_ADDRESS, account, withdrawMode] //
      )
    : "";

  const steps = [
    {
      pool: POOL_ADDRESS,
      data: swapData,
      callback: ADDRESS_ZERO, // we don't have a callback
      callbackData: "0x",
    },
  ];
  const nativeETHAddress = ADDRESS_ZERO;
  const paths = [
    {
      steps: steps,
      tokenIn: nativeETHAddress,
      amountIn: value,
    },
  ];

  const { config: config3 } = usePrepareContractWrite({
    address: ROUTER_ADDRESS,
    abi: RouterAbi,
    functionName: "swap",
    args: [
      paths, // paths
      0, // amountOutMin // Note: ensures slippage here
      Math.floor(Date.now() / 1000) + 60 * 10, // deadline // 10 minutes
    ],
    overrides: {
      from: account, // use the current user's wallet address
      value: value,
    },
  });

  async function handleSwap() {
    console.log("write3 button works?");
    console.log("config 3", config3);
    console.log(contract);
    const accountAddress = await signer.getAddress();
    const account = new ethers.Contract(accountAddress, signer);

    const response = await Router.swap(
      paths, // paths
      0, // amountOutMin // Note: ensures slippage here
      Math.floor(Date.now() / 1000) + 60 * 10, // deadline // 10 minutes
      {
        value: value,
        from: account, // use the current user's wallet address
      }
    );

    const tx_receipt = await response.wait();

    console.log("receipt: ", tx_receipt);
  }

  /* 
   __  ___ __  __ __  ______ ____ _____ ___    __    __ 
  /  |/  // / / // / /_  __//  _// ___// _ |  / /   / / 
 / /|_/ // /_/ // /__ / /  _/ / / /__ / __ | / /__ / /__
/_/  /_/ \____//____//_/  /___/ \___//_/ |_|/____//____/
*/

  const multicallInterface = new ethers.utils.Interface([
    "function multicall(tuple(address to, uint256 value, bytes data)[] _transactions)",
  ]);

  const Lender = new ethers.Contract(LENDING_ADDRESS, LendingAbi, signer);
  const WETH = new ethers.Contract(WETH_ADDRESS, ercAbi, signer);
  // WE have already Router Contract = Router

  // For balance check DAI Contract:
  const DAI = new ethers.Contract(DAI_ADDRESS, ercAbi, signer);

  async function handleMulticall() {
    const accountAddress = await signer.getAddress();
    const account = new ethers.Contract(
      accountAddress,
      multicallInterface,
      signer
    );

    let DAI_BALANCE = DAI.balanceOf(signer?.getAddress());
    console.log("DAI Balance BEFORE of the user: ", DAI_BALANCE);

    const calls = [
      {
        to: Lender.address,
        value: 0,
        data: Lender.interface.encodeFunctionData("borrowEther", [usdcAmount]),
      },
      {
        to: WETH.address,
        value: 0,
        data: WETH.interface.encodeFunctionData("approve", [
          ROUTER_ADDRESS,
          MAX_APPROVE,
        ]),
      },
      {
        to: Router.address,
        value: value,
        data: Router.interface.encodeFunctionData("swap", [
          paths,
          0,
          Math.floor(Date.now() / 1000) + 60 * 10,
        ]),
      },
    ];

    const response = await account.multicall(calls, { from: accountAddress }); // send to account itself
    const result = await response.wait();

    console.log("Multicall! HERE: ", result);

    DAI_BALANCE = await DAI.balanceOf(signer?.getAddress());
    console.log("DAI Balance AFTER of the user: ", DAI_BALANCE);

    const interfaceId = multicallInterface.getSighash("multicall");
    console.log(interfaceId);
  }

  /* 
  __  __ ____
 / / / //  _/
/ /_/ /_/ /  
\____//___/  
             
*/

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <main className={styles.main}>
        {/* TODO: pass dynamic chain id to display, here */}
        {/* <TokensBalanceDisplay address={""} chain={"ETH_GOERLI"} /> */}

        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 10, md: 20 }}
            py={{ base: 12, md: 20 }}
          >
            <Heading
              fontWeight={700}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Batch transactions, made
              <br />
              <Text as={"span"} fontWeight={700} color={"orange.200"}>
                simple.
              </Text>
            </Heading>

            <Stack>
              <Container
                centerContent
                maxW={"3xl"}
                py={8}
                color={"white"}
                fontWeight={500}
                fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                padding={1}
              >
                <Text
                  color={"white"}
                  fontWeight={400}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  zkSync Token Balance
                </Text>
                <TokensBalanceDisplay />
                <br /> <br />
                {/* Approve Section */}
                <Text
                  color={"red.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  #1
                </Text>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  Approve spending and set CAP LIMIT on your transactions.
                </Text>
                <br />
                <Container maxW={"3xl"}>
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    colorScheme={"blue"}
                    bgImage={
                      "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
                    }
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "yellow",
                      transition: "all 2s ease",
                    }}
                    disabled={!write1}
                    onClick={handleApprove}
                  >
                    {" "}
                    Approve
                  </Button>
                </Container>
                <br />
                <br />
                {/* Swap */}
                <Text
                  color={"red.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  #2
                </Text>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  Swap.
                </Text>
                <br />
                <Text
                  color={"red.100"}
                  fontWeight={600}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  USDC --&#62; ETH --&#62; WETH --&#62; DAI (One Click) USDC
                  --&#62; ETH --&#62; WETH --&#62; APPROVE --&#62; DAI
                </Text>
                <br />
                <Button
                  fontSize="24px"
                  transition={"all 0.3s ease"}
                  colorScheme={"blue"}
                  bgImage={
                    "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
                  }
                  border={"1"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  _hover={{
                    border: "1px solid rgba(var(--primary-color), 0.5)",
                    color: "yellow",
                    transition: "all 2s ease",
                  }}
                  onClick={handleSwap}
                >
                  {" "}
                  SWAP{" "}
                </Button>
                <br />
                <br />
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={1}
                >
                  Enter an Amount in USD you want to swap
                </Text>
                <br />
                <Input
                  maxW={"sm"}
                  fontWeight={700}
                  placeholder="Enter Amount in USDC"
                  onChange={(e) => setUsdcAmount(parseInt(e.target.value, 10))}
                ></Input>
                <br />
                <br />
                {/* Borrow */}
                <Text
                  color={"red.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  #3
                </Text>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  Borrow.
                </Text>
                <br />
                <Button
                  fontSize="24px"
                  transition={"all 0.3s ease"}
                  colorScheme={"blue"}
                  bgImage={
                    "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
                  }
                  border={"1"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  _hover={{
                    border: "1px solid rgba(var(--primary-color), 0.5)",
                    color: "yellow",
                    transition: "all 2s ease",
                  }}
                  onClick={() => write2?.()}
                >
                  {" "}
                  BORROW{" "}
                </Button>
                <br />
                <br />
                {/* MultiCall */}
                <Text
                  color={"red.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  #3
                </Text>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  Multicall.
                </Text>
                <br />
                <Button
                  fontSize="24px"
                  transition={"all 0.3s ease"}
                  colorScheme={"blue"}
                  bgImage={
                    "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
                  }
                  border={"1"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  _hover={{
                    border: "1px solid rgba(var(--primary-color), 0.5)",
                    color: "yellow",
                    transition: "all 2s ease",
                  }}
                  onClick={handleMulticall}
                >
                  {" "}
                  MULTICALL! F* YEAH!{" "}
                </Button>
                {/* State */}
                <Text
                  color={"white"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  {isLoading1 && <div>Check Wallet</div>}
                  {isSuccess1 && (
                    <div>Transaction: {JSON.stringify(data1)}</div>
                  )}
                  {isSuccess2 && (
                    <div>Transaction: {JSON.stringify(data2)}</div>
                  )}
                </Text>
                {/* <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
              </Container>

              <br /> <br /> <br />
              <br />
              <hr />
              <br />
              <br />
              <Heading color={"orange.100"}>Coming soon...</Heading>
              <br />
              <br />
              <hr />
              <br /> <br />{" "}
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  One-Click DEX Swaps
                  <br />
                  <br />
                  ....
                </Text>

                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </Container>
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  LP Withdraw & Buy
                  <br />
                  <br />
                  Deposit ETH into AAVE(any lending on protocool on zkSync
                  testnet), withdraw USDC and swap ETH to perform desired
                  action.
                </Text>
                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </Container>
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  One-Click Multichain NFT Purchase
                  <br />
                  <br />
                  ....
                </Text>
                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </Container>
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  Private Swaps
                  <br />
                  <br />
                  ....
                </Text>
                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </Container>
            </Stack>
          </Stack>

          <Container
            centerContent
            maxW={"3xl"}
            fontWeight={500}
            fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
          >
            <Text fontWeight={500}>List of zkSync Testnet Tokens:</Text>
            <br />
            <Link
              fontWeight={400}
              href="https://zksync2-testnet.zkscan.io/tokens"
            >
              https://zksync2-testnet.zkscan.io/tokens
            </Link>
          </Container>

          <br />
        </Container>
      </main>
    </div>
  );
}
