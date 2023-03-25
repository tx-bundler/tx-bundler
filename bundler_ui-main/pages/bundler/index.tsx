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
import NavbarAlt from "../../components/navigation/navbar-alt";
import SimpleThreeColumns from "../../components/threeColumn";

export default function Bundler() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 4, md: 4 }}
            py={{ base: 4, md: 4 }}
          >
            {/* <Heading
              fontWeight={700}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            >
              Batch transactions, made
              <br />
              <Text as={"span"} fontWeight={700} color={"blue.500"}>
                simple.
              </Text>
            </Heading> */}
            {/* Image Container */}
            {/* <Container centerContent maxW={"3xl"}>
              <Image
                src={ZKS}
                alt="logo"
                width={400}
                height={400}
                onClick={() => router.push("/")}
              ></Image>
            </Container> */}
            {/* navbar-alt component */}
            <NavbarAlt></NavbarAlt>
            {/* JUNK */}
            {/* TODO: pass dynamic chain id to display, here */}
            {/* <TokensBalanceDisplay address={""} chain={"ETH_GOERLI"} /> */}
            <br /> <br />
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Text
                color={"gray.600"}
                fontWeight={700}
                fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
                className={styles.textGradient}
                py={4}
              >
                Build Your Custom zAAp
                <br />
              </Text>
              <br />
              <br />
              <SimpleThreeColumns />
              <br />
              <br />
              <Button
                fontSize="24px"
                colorScheme={"green"}
                rounded={"full"}
                px={12}
                py={10}
                onClick={() => router.push("/bundler")}
                _hover={{
                  bg: "orange.500",
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
