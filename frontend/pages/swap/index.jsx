import React, { useState } from "react";
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
import TokensBalanceDisplay from "../../components/tokensBalanceDisplay.jsx";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Swap() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

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
              <Text as={"span"} fontWeight={700} color={"blue.500"}>
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
                  testnet), withdraw USDC and swap ETH to perform desired
                  action.
                </Text>
                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
                  One-Click DEX Swaps
                  <br />
                  <br />
                  ....
                </Text>

                <SwapModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </Container>

              <Container centerContent maxW={"3xl"} py={8}>
                <Text
                  color={"gray.600"}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
                  padding={10}
                >
                  One-Click NFT Purchase
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "orange.500",
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
                  GMX Swap
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "red.500",
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
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "orange.500",
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
                  Private Swaps
                  <br />
                  <br />
                  ....
                </Text>
                <Button
                  fontSize="24px"
                  colorScheme={"blue"}
                  rounded={"full"}
                  px={12}
                  py={8}
                  onClick={() => router.push("/swap")}
                  _hover={{
                    bg: "black",
                  }}
                >
                  Swap
                </Button>
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
              <Link href="https://zksync2-testnet.zkscan.io/tokens">
                https://zksync2-testnet.zkscan.io/tokens
              </Link>
            </Container>

                       <br />   

          {/* Hard-Coded Table */}
          <Container maxW={"3xl"}>
            <TableContainer>
              <Table
                style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
                variant="simple"
                size="md"
              >
                <Thead>
                  <Tr>
                    <Th>Available DEX</Th>
                    <Th isNumeric>Liquidity ~Simulated~</Th>
                    <Th isNumeric>ROI ~Simulated~</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>Mute.io</Td>
                    <Td isNumeric>$322,660</Td>
                    <Td isNumeric>14.25%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Uniswap</Td>
                    <Td isNumeric>$693,901</Td>
                    <Td isNumeric>11.2%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Sushi</Td>
                    <Td isNumeric>$910,789</Td>
                    <Td isNumeric>13.45%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Balancer</Td>
                    <Td isNumeric>$317,715</Td>
                    <Td isNumeric>20.91%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>ParaSwap</Td>
                    <Td isNumeric>$81,398</Td>
                    <Td isNumeric>10.5%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>SyncSwap</Td>
                    <Td isNumeric>$836,283</Td>
                    <Td isNumeric>22.3%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>ZigZag</Td>
                    <Td isNumeric>$862,508</Td>
                    <Td isNumeric>12.1%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Hashflow</Td>
                    <Td isNumeric>$670,939</Td>
                    <Td isNumeric>15.4%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Ondefy</Td>
                    <Td isNumeric>$361,603</Td>
                    <Td isNumeric>16.2%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Swapsicle</Td>
                    <Td isNumeric>$387,390</Td>
                    <Td isNumeric>73.2%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>UniDex</Td>
                    <Td isNumeric>$616,035</Td>
                    <Td isNumeric>32.3%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Izumi</Td>
                    <Td isNumeric>$195,776</Td>
                    <Td isNumeric>18.4%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>MUX</Td>
                    <Td isNumeric>$509,734</Td>
                    <Td isNumeric>22.4%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </Tr>
                  <Tr>
                    <Td>Primex</Td>
                    <Td isNumeric>$411,340 </Td>
                    <Td isNumeric>15.2%</Td>
                    <SwapTableModal
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
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
