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
  Link,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Community() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        <Container maxW={""} centerContent>
          <Heading>Hottest Swaps!</Heading>

          <Text fontSize={{ base: "md", sm: "md", md: "lg" }}>
            View the most used swaps around the zAAp community!
          </Text>

          <Container maxW={""}>
            <TableContainer>
              <Table
                style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
                variant="simple"
                size=""
              >
                <Thead>
                  <Tr>
                    <Th
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      # Swaps (weekly)
                    </Th>
                    <Th
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      Swap
                    </Th>
                    <Th
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      Route
                    </Th>
                  </Tr>
                </Thead>

                <Tbody
                  color={"gray.100"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                >
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>1579</Td>
                    <Td
                      _hover={{
                        color: "yellow",
                        transition: "all 1s ease",
                      }}
                      onClick={() => router.push("/your-zaaps")}
                    >
                      Custom Swap
                    </Td>
                    <Td>
                      USDC --&#62; ETH --&#62; WETH --&#62; DAI (One Click) USDC
                      --&#62; ETH --&#62; WETH --&#62; APPROVE --&#62; DAI
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}> 311</Td>
                    <Td>LP Withdraw & Buy</Td>
                    <Td>--&#62;</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>234</Td>
                    <Td>Private Swap</Td>
                    <Td>--&#62;</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>112</Td>
                    <Td>Multichain zkSync Transfer</Td>
                    <Td>--&#62;</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>42</Td>
                    <Td>LP / Mute.io Swap</Td>
                    <Td>
                      USDC --&#62; ETH --&#62; WETH --&#62; Mute.io Purchase
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
          <br /><br />
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
        </Container>
      </main>
    </div>
  );
}
