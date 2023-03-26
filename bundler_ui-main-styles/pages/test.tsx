import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
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
} from "wagmi";
import { VaultAbi } from "../constants/abis/VaultAbi";
import { PoolAbi } from "../constants/abis//PoolAbi";
import { RouterAbi } from "../constants/abis/RouterAbi";
import { factoryAbi } from "../constants/abis/PoolFactory";
import { testAbi } from "../constants/abis/testAbi";
import SwapComp from "../components/Swap";

export default function Swap() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (address) {
      setLoading(false);
    }
  }, [address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isConnected) {
    return <div>{address && <SwapComp address={address} />}</div>;
  }
}
