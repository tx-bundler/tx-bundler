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
import SwapModal from "../../components/SwapModal";
import SwapTableModal from "../../components/SwapTableModal";
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { IEthereumProvider } from "@argent/login-react";
import * as zksync from "zksync-web3";

import classNames from "classnames";
import dynamic from "next/dynamic";

export default function Swap() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleZAP = () => {
    console.log("Set for me PROVIDER, SIGNER ");
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
            py={{ base: 10, md: 20 }}
          >
            <Heading
              fontWeight={700}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Batch transactions, made
              <br />
              <Text as={"span"} fontWeight={700} color={"yellow.500"}>
                simple.
              </Text>
            </Heading>

            <Stack>
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  Not Enough ETH? Dont be sad! Use our one-click LENDING & SWAP
                  Protocol!! <br /> <br /> <br />
                  Also paymaster will pay your gas fee!!! <br /> <br /> <br />
                  You have USDC: <br /> <br />
                  USDC --&#62; ETH --&#62; WETH --&#62; DAI (One Click)
                  <br />
                  <br />
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    textColor={"white"}
                    bgImage={
                      "linear-gradient(to right, rgb(247 255 0), rgb(182 49 167))"
                    }
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "orange.900",
                      transition: "all 2s ease",
                      fontWeight: "700",
                    }}
                    onClick={handleZAP}
                  >
                    zAAAAP
                  </Button>
                  {/* <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
                </Text>
              </Container>
              <br /> <br /> <br />
              <br />
              <hr />
              <br />
              <br />
              <Heading>Coming soon...</Heading>
              <br />
              <br />
              <hr />
              <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
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
                  One-Click NFT Purchase
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
                  One-Click Multicall Swaps
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
            <br />
          </Container>
        </Container>
      </main>
    </div>
  );
}
