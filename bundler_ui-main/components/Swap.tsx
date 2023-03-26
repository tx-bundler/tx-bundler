import { ReactElement } from "react";
import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { Button } from "@chakra-ui/react";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useProvider,
} from "wagmi";
import { VaultAbi } from "../constants/abis/VaultAbi";
import { PoolAbi } from "../constants/abis//PoolAbi";
import { RouterAbi } from "../constants/abis/RouterAbi";
import { factoryAbi } from "../constants/abis/PoolFactory";
import { testAbi } from "../constants/abis/testAbi";

export default function SwapComp({ address }: any) {
  const ercAbi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function deposit() public payable",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];

  const WETH_ADDRESS = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";
  const DAI_ADDRESS = "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b";
  const DAI_DECIMALS = 18;
  const POOL_ADDRESS = "0xe52940eDDa6ec5FDabef7C33B9C1E1d613BbA144"; // ETH/DAI
  const VAULT_CONTRACT_ADDRESS = "0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8";
  const ROUTER_ADDRESS = "0xB3b7fCbb8Db37bC6f572634299A58f51622A847e";
  const POOLFACTORY_ADDRESS = "0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006"; // Classic
  const ADDRESS_ZERO = ethers.constants.AddressZero;
  const value = ethers.utils.parseEther("0.000001");

  /*   const { config: approve } = usePrepareContractWrite({
    address: WETH_ADDRESS,
    abi: ercAbi,
    functionName: "approve",
    args: [ROUTER_ADDRESS, value],
  });
  const {
    data: approve_data,
    isLoading: approve_isLoading,
    isSuccess: approve_isSuccess,
    write: approve_write,
  } = useContractWrite(approve); */

  const withdrawMode = 2; // 1 or 2 to withdraw to user's wallet

  const swapData: string = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "uint8"],
    [WETH_ADDRESS, address, withdrawMode] // tokenIn, to, withdraw mode
  );
  //console.log(swapData)
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

  const { config: swap_config } = usePrepareContractWrite({
    address: ROUTER_ADDRESS,
    abi: RouterAbi,
    functionName: "swap",
    args: [
      paths,
      0,
      Math.floor(Date.now() / 1000) + 60 * 10,
      ethers.utils.parseEther("0.000001"),
    ],
  });

  const {
    error,
    data: swap_data,
    isLoading: swap_isLoading,
    isSuccess: swap_isSuccess,
    write,
  } = useContractWrite(swap_config);

  async function handleClick() {
    // approve_write?.();

    console.log("click");
    write?.();
  }
  useEffect(() => {}, [address]);
  return (
    <div>
      <Button disabled={!write} onClick={handleClick}>
        Feed
      </Button>

      {swap_isLoading && <div>Check Wallet</div>}
      {swap_isSuccess && (
        <div>Approve Transaction: {JSON.stringify(swap_data)}</div>
      )}
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </div>
  );
}
