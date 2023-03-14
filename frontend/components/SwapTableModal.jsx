import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Spacer,
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

export default function SwapTableModal() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
    <Flex>
    <Spacer />
      <Button
        fontSize="20px"
        colorScheme={"blue"}
        rounded={"full"}
        px={6}
        py={4}
        _hover={{
          bg: "red.500",
        }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Swap
      </Button>
      </Flex>
      {/* <Button
        fontSize="24px"
        colorScheme={"blue"}
        bg={"green.500"}
        rounded={"full"}
        px={12}
        py={8}
        _hover={{
          bg: "blue.600",
        }}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        Swap
      </Button> */}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>DEX Hot Swap</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="700" fontSize="lg" color={"blue"}>
              Customize and review your swap!
            </Text>

            <br />

            <Text fontWeight="600" color={"gray.600"}>
              Available ETH: 0.42025
            </Text>

            <br />

            <Text fontWeight="600" color={"gray.600"}>
              Select Pool(s)
            </Text>

            <br />

            <Container maxW={"3xl"}>
              <TableContainer>
                <Table
                  style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
                  variant="simple"
                  size="sm"
                >
                  <Thead>
                    <Tr>
                      <Th>Available Pools</Th>
                      <Th>Gas Fee</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td>Uniswap</Td>
                      <Td>$0.00011</Td>
                    </Tr>
                    <Tr>
                      <Td>1inch</Td>
                      <Td>$0.0038</Td>
                    </Tr>
                    <Tr>
                      <Td>Balancer</Td>
                      <Td>$0.0000042</Td>
                    </Tr>
                    <Tr>
                      <Td>MetaMask</Td>
                      <Td>$0.00032</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Container>

            <br />

            <Text fontWeight="600" color={"gray.600"}>
              Approx. Pool Output
            </Text>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
