import React from "react";
import Image from "next/image";
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
import styles from "../styles/Home.module.css";
import TokensBalanceDisplay from "../components/tokensBalanceDisplay";
import { useRouter } from "next/router";
import ZKS from "../public/zks.png";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
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

            <Container centerContent maxW={"3xl"}>
              <Image
                src={ZKS}
                alt="logo"
                width={400}
                height={400}
                onClick={() => router.push("/")}
              ></Image>
            </Container>

            <Text
              color={"white"}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
            >
              Save time and money with bundle transactions, combine multiple
              transactions into one and pay only one gas fee!
              <br />
            </Text>
            <Text
              color={"white"}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
            >
              Out of ETH? No worries! Pay in USDC and keep your transactions
              moving with our account abstraction product.
            </Text>

            {/* TODO: pass dynamic chain id to display, here */}
            {/* <TokensBalanceDisplay address={""} chain={"ETH_GOERLI"} /> */}

            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
                  <Button
                    fontSize="24px"
                    transition={"all 0.3s ease"}
                    colorScheme={"blue"}
                    bgImage={"linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"}
                    border={"1"}
                    rounded={"full"}
                    px={12}
                    py={8}
                    _hover={{
                      border: "1px solid rgba(var(--primary-color), 0.5)",
                      color: "yellow",
                      transition: "all 2s ease",
                    }}
                    onClick={() => router.push("/your-zaaps")}>
                Swap Now!
              </Button>
            </Stack>
          </Stack>
        </Container>
      </main>
    </div>
  );
}
