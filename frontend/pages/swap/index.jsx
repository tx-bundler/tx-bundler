import React from "react";
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
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay.jsx";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Swap() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        {/* TODO: pass dynamic chain id to display, here */}
        <TokensBalanceDisplay address={""} chain={"ETH_GOERLI"} />

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
              <Text as={"span"} fontWeight={700} color={"green.500"}>
                simple.
              </Text>
            </Heading>

            <Stack>
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.600"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  One-Click AAVE Swaps
                  <br />
                  <br />
                  Deposit ETH into AAVE(any lending on protocool on zkSync
                  testnet), withdraw USDC and swap ETH and perform desired
                  action.
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  bg={"green.500"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "blue.600",
                  }}
                >
                  Swap
                </Button>
              </Container>
              <hr />
              <br />
              <br />
              <Heading>Coming soon...</Heading>
              <br />
              <br />
              <hr />
              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.600"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  GMX Swap
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  bg={"green.500"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "purple.600",
                  }}
                >
                  Swap
                </Button>
              </Container>

              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.600"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  Buy NFT from Collateral
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  bg={"green.500"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "orange.600",
                  }}
                >
                  Swap
                </Button>
              </Container>

              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.600"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  One-Click Yearn Swaps
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  bg={"green.500"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "blue.600",
                  }}
                >
                  Swap
                </Button>
              </Container>
            </Stack>
          </Stack>
        </Container>
      </main>
    </div>
  );
}
