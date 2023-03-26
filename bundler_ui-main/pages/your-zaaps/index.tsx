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
  Flex,
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
import { AAFactoryAbi } from "@/constants/abis/AAFactoryAbi";
import { AccountAbi } from "@/constants/abis/AccountAbi";
import { EIP712Signer, types, utils, Wallet } from "zksync-web3";
import { sign } from "crypto";

export default function Swap() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();

  const USDC_ADDRESS = "0x0faF6df7054946141266420b43783387A78d82A9";
  const LENDING_ADDRESS = "0xA7c9A38e77290420eD06cf54d27640dE27399eB1";

  const WETH_ADDRESS = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";
  const DAI_ADDRESS = "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b";
  const DAI_DECIMALS = 18;
  const VAULT_CONTRACT_ADDRESS = "0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8";
  const POOL_ADDRESS = "0xe52940eDDa6ec5FDabef7C33B9C1E1d613BbA144"; // ETH/DAI
  const ROUTER_ADDRESS = "0xB3b7fCbb8Db37bC6f572634299A58f51622A847e";
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

  const value = ethers.utils.parseEther("0.0001");

  const withdrawMode = 2; // 1 or 2 to withdraw to user's wallet

  const swapData = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "uint8"],
    [WETH_ADDRESS, "0x079217e9a45A0e4B49C3cb9B6D93b127513D1F07", withdrawMode] // tokenIn, to, withdraw mode
  );
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
      from: "0x079217e9a45A0e4B49C3cb9B6D93b127513D1F07", // useAccountAddress
      value: value,
    },
  });

  const contract = useContract({
    address: ROUTER_ADDRESS,
    abi: RouterAbi,
  });

  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();

  const Router = new ethers.Contract(ROUTER_ADDRESS, RouterAbi, signer);

  async function handleSwap() {
    console.log("write3 button works?");
    console.log("config 3", config3);
    console.log(contract);

    const response = await Router.swap(
      paths, // paths
      0, // amountOutMin // Note: ensures slippage here
      Math.floor(Date.now() / 1000) + 60 * 10, // deadline // 10 minutes
      {
        value: value,
      }
    );

    const tx_receipt = await response.wait();

    console.log("receipt: ", tx_receipt);
  }

  /* 
   ___   ____ ___   __   ____ __  __      ___   _____ _____ ____   __  __ _  __ ______       ___    ___          ____ ___   _____ ______ ____   ___ __  __
  / _ \ / __// _ \ / /  / __ \\ \/ /     / _ | / ___// ___// __ \ / / / // |/ //_  __/      / _ |  / _ |        / __// _ | / ___//_  __// __ \ / _ \\ \/ /
 / // // _/ / ___// /__/ /_/ / \  /     / __ |/ /__ / /__ / /_/ // /_/ //    /  / /        / __ | / __ |       / _/ / __ |/ /__   / /  / /_/ // , _/ \  / 
/____//___//_/   /____/\____/  /_/     /_/ |_|\___/ \___/ \____/ \____//_/|_/  /_/        /_/ |_|/_/ |_|      /_/  /_/ |_|\___/  /_/   \____//_/|_|  /_/  
*/

  const AA_FACTORY_ADDRESS = "0xEb6D0610064b49d5868703892C3cf5A5AF10544E";
  const AA_ABI = AAFactoryAbi;

  let aa_address;

  async function handleDeployAA() {
    const aaFactory = new ethers.Contract(AA_FACTORY_ADDRESS, AA_ABI, signer);
    console.log(aaFactory);

    const owner = signer?.getAddress();
    console.log("Account owner pk: ", owner);

    // For the simplicity of the tutorial, we will use zero hash as salt
    const salt = ethers.constants.HashZero;

    console.log("Befor deploy AA");
    const tx = await aaFactory.deployAccount(salt, owner);
    await tx.wait();
    console.log("After deploy AA", tx);
  }

  async function sendETHtoAA() {
    const aaFactory = new ethers.Contract(AA_FACTORY_ADDRESS, AA_ABI, signer);
    const owner = await signer?.getAddress();
    const salt = ethers.constants.HashZero;

    console.log("OWNER", owner);

    const abiCoder = new ethers.utils.AbiCoder();
    const accountAddress = utils.create2Address(
      salt,
      await aaFactory.aaBytecodeHash(),
      abiCoder.encode(["address"], [owner]),
      AA_FACTORY_ADDRESS
    );
    aa_address = accountAddress;

    console.log(`Account deployed on address ${accountAddress}`);
    await (
      await signer.sendTransaction({
        to: accountAddress,
        value: ethers.utils.parseEther("0.02"),
      })
    ).wait();
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
    const aaFactory = new ethers.Contract(AA_FACTORY_ADDRESS, AA_ABI, signer);
    const owner = await signer?.getAddress();
    const salt = ethers.constants.HashZero;

    console.log("OWNER", owner);

    const abiCoder = new ethers.utils.AbiCoder();
    const accountAddress = utils.create2Address(
      salt,
      await aaFactory.aaBytecodeHash(),
      abiCoder.encode(["address"], [owner]),
      AA_FACTORY_ADDRESS
    );
    aa_address = accountAddress;
    console.log(aa_address, "and", signer);
    const account = new ethers.Contract(aa_address, AccountAbi, signer);

    const usdcAmount = ethers.utils.parseUnits("100", 6);

    const USDC = new ethers.Contract(USDC_ADDRESS, ercAbi, signer);

    let tx0 = await USDC.populateTransaction.approve(
      LENDING_ADDRESS,
      MAX_APPROVE
    );
    tx0 = {
      ...tx0,
      from: aa_address,
      to: USDC_ADDRESS,
      chainId: 280,
      nonce: await provider.getTransactionCount(aa_address),
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      } as types.Eip712Meta,
      value: ethers.utils.parseEther("0"),
      data: USDC.interface.encodeFunctionData("approve", [
        LENDING_ADDRESS,
        MAX_APPROVE,
      ]),
    };

    tx0.gasPrice = await provider.getGasPrice();
    tx0.gasLimit = await provider.estimateGas(tx0);

    console.log("TX 0 is caltulating");

    const signedTxHash0 = EIP712Signer.getSignedDigest(tx0);
    const signature0 = ethers.utils.arrayify(
      ethers.utils.joinSignature(signer._signingKey().signDigest(signedTxHash0))
    );

    console.log("TX 0 CALCULATEFD!");
    tx0.customData = {
      ...tx0.customData,
      customSignature: signature0,
    };

    let tx1 = await Lender.populateTransaction.borrowEther(usdcAmount);

    tx1 = {
      ...tx1,
      from: aa_address,
      to: Lender.address,
      chainId: 280,
      nonce: await provider.getTransactionCount(aa_address),
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      } as types.Eip712Meta,
      value: ethers.utils.parseEther("0"),
      data: Lender.interface.encodeFunctionData("borrowEther", [usdcAmount]),
    };

    tx1.gasPrice = await provider.getGasPrice();
    tx1.gasLimit = await provider.estimateGas(tx1);

    console.log(
      "Function data:",
      Lender.interface.encodeFunctionData("borrowEther", [usdcAmount])
    );

    const signedTxHash = EIP712Signer.getSignedDigest(tx1);
    const signature = ethers.utils.arrayify(
      ethers.utils.joinSignature(signer._signingKey().signDigest(signedTxHash))
    );

    console.log("Calculeted tx1");

    tx1.customData = {
      ...tx1.customData,
      customSignature: signature,
    };

    let calls: any = [utils.serialize(tx0), utils.serialize(tx1)];

    console.log(
      "Function data:",
      Lender.interface.encodeFunctionData("borrowEther", [usdcAmount])
    );
    const response = await account.multicall(calls); // send to account itself
    const result = await response.wait();

    console.log("Multicall! HERE: ", result);

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
                {/* <Text
                color={"white"}
                fontWeight={400}
                fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                py={2}
              >
                zkSync Token Balance
              </Text>
              <TokensBalanceDisplay /> */}

                <br />
                <br />
                                {/* Abstract Account */}
                                <Container maxW={"3xl"}>
                  <Flex align="center">
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
                      px={40}
                    >
                      Deploy Your Abstract Account
                    </Text>
                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      border={"1"}
                      rounded={"full"}
                      fontWeight={700}
                      px={12}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      onClick={handleDeployAA}
                    >
                      {" "}
                      DEPLOY!
                    </Button>
                    <br />
                  </Flex>
                </Container>
                <br /> <br />
                {/* Send Ether */}
                <Container maxW={"3xl"}>
                  <Flex align="center">
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
                      px={40}
                    >
                      Send ETH to Your Account
                    </Text>
                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      border={"1"}
                      rounded={"full"}
                      fontWeight={700}
                      px={12}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      onClick={sendETHtoAA}
                    >
                      Send ETH
                    </Button>
                    <br />
                  </Flex>
                </Container>
                <br /><br />
                {/* Borrow */}
                <Container maxW={"3xl"}>
                  <Flex align="center">
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
                      px={48}
                    >
                      Borrow.
                    </Text>
                    <br />
                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      fontWeight={700}
                      border={"1"}
                      rounded={"full"}
                      px={12}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      onClick={() => write2?.()}
                    >
                      {" "}
                      BORROW{" "}
                    </Button>
                  </Flex>
                </Container>
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
                {/* Approve Section */}
                <Container maxW={"3xl"}>
                  <Flex align="center">
                    <Text
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      #4
                    </Text>
                    <Text
                      color={"gray.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                      px={16}
                    >
                      Approve WETH and set spending cap.
                    </Text>
                    <br />
                    <br />

                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      fontWeight={700}
                      border={"1"}
                      rounded={"full"}
                      px={12}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      disabled={!write1}
                      onClick={handleApprove}
                    >
                      {" "}
                      APPROVE
                    </Button>
                  </Flex>
                </Container>
                <br />
                {/* Swap */}
                <br />
                <Text
                  maxW={"lg"}
                  color={"red.100"}
                  fontWeight={600}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  USDC --&#62; Borrow ETH from LP --&#62; Swap ETH --&#62; WETH
                  --&#62; DAI
                  <br />
                  <br />
                  Using WETH we approve WETH for allowance
                  <br />
                  <br />
                </Text>
                <br />
                <Container maxW={"3xl"}>
                  <Flex align="center">
                    <Text
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      #5
                    </Text>
                    <Text
                      color={"gray.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                      px={52}
                    >
                      Swap.
                    </Text>
                    <br />
                    <br />
                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      border={"1"}
                      rounded={"full"}
                      px={12}
                      fontWeight={700}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      onClick={handleSwap}
                    >
                      {" "}
                      SWAP{" "}
                    </Button>
                  </Flex>
                </Container>

                <br />
                <br />
                {/* MultiCall */}
                <Container maxW={"3xl"}>
                  <Flex align="center">
                    <Text
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      #6
                    </Text>
                    <Text
                      color={"gray.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                      px={40}
                    >
                      Multicall.
                    </Text>
                    <br />
                    <Button
                      fontSize="24px"
                      transition={"all 0.3s ease"}
                      colorScheme={"blue"}
                      bgImage={
                        "linear-gradient(to right, RGB(220,77,1), RGB(234, 206, 9))"
                      }
                      border={"1"}
                      rounded={"full"}
                      fontWeight={700}
                      px={12}
                      py={8}
                      _hover={{
                        border: "1px solid rgba(var(--primary-color), 0.5)",
                        color: "black",
                        transition: "all 2s ease",
                      }}
                      onClick={handleMulticall}
                    >
                      {" "}
                      MULTICALL! F* YEAH!{" "}
                    </Button>
                  </Flex>
                </Container>
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
              </Container>
              <br /> <br /> <br /> <br />
              <hr />
              <br />
              <br />
              <Heading color={"orange.100"}>Coming soon...</Heading>
              <br />
              <br />
              <hr />
              <br /> <br />
              <br /> <br />
              <br /> <br />{" "}
              <Container centerContent maxW={"3xl"} py={2}>
                <Flex align="center">
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
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    bgColor={"gray.500"}
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "red",
                      transition: "all 2s ease",
                    }}
                    onClick={() => router.push("/your-zaaps")}
                  >
                    Soon&#8482;
                  </Button>
                </Flex>
              </Container>
              <Container centerContent maxW={"3xl"} py={2}>
                <Flex align="center">
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
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    bgColor={"gray.500"}
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "red",
                      transition: "all 2s ease",
                    }}
                    onClick={() => router.push("/your-zaaps")}
                  >
                    Soon&#8482;
                  </Button>
                </Flex>
              </Container>
              <Container centerContent maxW={"3xl"} py={2}>
                <Flex align="center">
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
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    bgColor={"gray.500"}
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "red",
                      transition: "all 2s ease",
                    }}
                    onClick={() => router.push("/your-zaaps")}
                  >
                    Soon&#8482;
                  </Button>
                </Flex>
              </Container>
              <Container centerContent maxW={"3xl"} py={2}>
                <Flex align="center">
                  <Text
                    color={"gray.100"}
                    fontWeight={500}
                    fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    padding={10}
                  >
                    Private Swaps
                  </Text>
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    bgColor={"gray.500"}
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "red",
                      transition: "all 2s ease",
                    }}
                    onClick={() => router.push("/your-zaaps")}
                  >
                    Soon&#8482;
                  </Button>
                </Flex>
              </Container>
            </Stack>
          </Stack>
        </Container>
      </main>
    </div>
  );
}
