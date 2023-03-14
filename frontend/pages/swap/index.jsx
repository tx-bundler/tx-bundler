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
                  testnet), withdraw USDC and swap ETH and perform desired
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
                    bg: "purple.500",
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
            </Stack>
          </Stack>

          <Container maxW={"3xl"}>
            <TableContainer>
              <Table style={{borderCollapse:"separate", borderSpacing:"0 1em"}} variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Available DEX</Th>
                    <Th>Liquidity</Th>
                    <Th isNumeric>ROI</Th>
                    <Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>Mute.io</Td>
                    <Td>$322,660</Td>
                    <Td isNumeric>14.25%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Uniswap</Td>
                    <Td>$693,901</Td>
                    <Td isNumeric>11.2%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Sushi</Td>
                    <Td>$910,789</Td>
                    <Td isNumeric>13.45%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Balancer</Td>
                    <Td>$317,715</Td>
                    <Td isNumeric>20.91%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>ParaSwap</Td>
                    <Td>$81,398</Td>
                    <Td isNumeric>10.5%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>SyncSwap</Td>
                    <Td>$836,283</Td>
                    <Td isNumeric>22.3%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>ZigZag</Td>
                    <Td>$862,508</Td>
                    <Td isNumeric>12.1%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Hashflow</Td>
                    <Td>$670,939</Td>
                    <Td isNumeric>15.4%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Ondefy</Td>
                    <Td>$361,603</Td>
                    <Td isNumeric>16.2%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Swapsicle</Td>
                    <Td>$387,390</Td>
                    <Td isNumeric>73.2%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>UniDex</Td>
                    <Td>$616,035</Td>
                    <Td isNumeric>32.3%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Izumi</Td>
                    <Td>$195,776</Td>
                    <Td isNumeric>18.4%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>MUX</Td>
                    <Td>$509,734</Td>
                    <Td isNumeric>22.4%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
                  </Tr>
                  <Tr>
                    <Td>Primex</Td>
                    <Td>$411,340 </Td>
                    <Td isNumeric>15.2%</Td>
                    <SwapTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
