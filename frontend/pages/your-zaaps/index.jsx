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
import styles from "../../styles/Home.module.css";
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay.jsx";
import { useRouter } from "next/router";
import ZKS from "../../public/zks.png";

export default function YourZaaps() {
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
              <Text as={"span"} fontWeight={700} color={"orange.500"}>
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
              color={"gray.600"}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
            >
              Save time and money with bundle transactions, combine multiple
              transactions into one and pay only one gas fee!
              <br />
            </Text>
            <Text
              color={"gray.700"}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
            >
              Out of ETH? No worries! Pay in USDC and keep your transactions
              moving with our account abstraction product.
            </Text>

            <Card className={`${styles.card} ${styles.bgBlur}`}>
              <Text fontSize={{ base: "xl", sm: "xl", md: "2xl" }} fontWeight={500} className={styles.textGradient}>card-alt</Text>
            </Card>
            <Button
              className={`${styles.btnGradient} ${styles.btn} ${styles.btnGlow} ${styles.btnSemiTransparent}`}
            >
              asd
            </Button>

            {/* JUNK */}
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
                colorScheme={"blue"}
                rounded={"full"}
                px={12}
                py={10}
                onClick={() => router.push("/your-zaaps")}
                _hover={{
                  bg: "blue.600",
                }}
              >
                Swap Now!
              </Button>
            </Stack>
          </Stack>
        </Container>
      </main>
    </div>
  );
}
