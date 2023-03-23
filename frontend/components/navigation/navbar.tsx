import { ConnectButton } from "@rainbow-me/rainbowkit";
// import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
// import "../../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import React, { FC, useState } from "react";
import { ethers } from "ethers";
import { IEthereumProvider } from "@argent/login-react";
import { ChakraProvider } from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Menu,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import DLOGO from "../../public/cw3d-logo.png";
import ZKS from "../../public/zks.png";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, zkSync, zkSyncTestnet, goerli } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../../layout/mainLayout";
import dynamic from "next/dynamic";

const ArgentLoginButton = dynamic(
  () => import("@argent/login-react").then((mod) => mod.ArgentLoginButton),
  { ssr: false }
);

const { chains, provider } = configureChains(
  [mainnet, zkSync, zkSyncTestnet, goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "zkSync TX Bundler",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function Navbar() {
  const router = useRouter();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  const handleConnect = async (ethereumProvider: IEthereumProvider) => {
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    setProvider(provider);
  };

  const handleDisconnect = async () => {
    localStorage.removeItem("walletconnect"); // to make sure WC is disconnected
    setProvider(undefined);
  };

  return (
    <>
      <Box
        bgImage={"linear-gradient(to right, rgb(247 255 0), rgb(182 49 167))"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link href="/">
              <Image
                src={ZKS}
                alt="logo"
                width={200}
                height={200}
                onClick={() => router.push("/")}
              />
            </Link>
          </Box>

          <Flex>
            <Stack
              h={16}
              justifyContent={"space-between"}
              direction={"row"}
              fontSize={"22px"}
              spacing={28}
              display="flex"
              color={"white"}
              alignItems={"center"}
              as="b"
            >
              <Link
                _hover={{
                  color: "yellow.800",
                  transition: "all 1s ease",
                }}
                onClick={() => router.push("/")}
              >
                Home
              </Link>
              <Link
                _hover={{
                  color: "yellow.800",
                  transition: "all 1s ease",
                }}
                onClick={() => router.push("/your-zaaps")}
              >
                Your zAAps
              </Link>
              {/* <Link onClick={() => router.push("/swap")}>Swap</Link> */}
              {/* <Link
                _hover={{
                  color: "orange.500",
                }}
                onClick={() => router.push("/bundler")}
              >
                Bundler
              </Link> */}
            </Stack>
          </Flex>
          <Flex
            h={16}
            px={10}
            alignItems={"center"}
            alignSelf={"center"}
            justifyContent={"space-between"}
          >
            <ArgentLoginButton
              options={{
                chainId: 280,
                rpcUrl: "https://zksync2-testnet.zksync.dev",
              }}
              onConnect={handleConnect}
              onError={console.error}
            />

            <Flex padding={10}>
              <ConnectButton></ConnectButton>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
