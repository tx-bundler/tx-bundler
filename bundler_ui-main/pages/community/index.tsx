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
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay.jsx";
import { useRouter } from "next/router";
import NavbarAlt from "../../components/navigation/navbar-alt";
import SimpleThreeColumns from "../../components/threeColumn";

export default function Community() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        <Container maxW={""} centerContent>
          <Heading>Hottest Swaps!</Heading>

          <Text fontSize={{ base: "md", sm: "md", md: "lg" }}>View the most used swaps around the zAAp community!</Text>

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
                    <Th
                      color={"red.100"}
                      fontWeight={500}
                      fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                    >
                      Gas Fee
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
                    <Td                   _hover={{
                    color: "yellow",
                    transition: "all 1s ease",
                  }} onClick={() => router.push("/your-zaaps")}>
                      Custom Swap
                    </Td>
                    <Td>
                      USDC --&#62; ETH --&#62; WETH --&#62; DAI (One Click) USDC
                      --&#62; ETH --&#62; WETH --&#62; APPROVE --&#62; DAI
                    </Td>
                    <Td>$0.00032</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}> 311</Td>
                    <Td>LP Withdraw & Buy</Td>
                    <Td>--&#62;</Td>
                    <Td>$0.00011</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>234</Td>
                    <Td>Private Swap</Td>
                    <Td>--&#62;</Td>
                    <Td>$0.0038</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>112</Td>
                    <Td>Multichain zkSync Transfer</Td>
                    <Td>--&#62;</Td>
                    <Td>$0.0000042</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "xl", sm: "xl", md: "2xl" }}>42</Td>
                    <Td>LP / Mute.io Swap</Td>
                    <Td>
                      USDC --&#62; ETH --&#62; WETH --&#62; Mute.io Purchase
                    </Td>
                    <Td>$0.00032</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </Container>
      </main>
    </div>
  );
}
