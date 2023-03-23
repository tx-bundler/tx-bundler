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

export default function SwapModal() {
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
          transition: "all 3s ease",
        }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        zAAAAP
      </Button>

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
          <ModalHeader fontWeight="800">DEX Hot Swap</ModalHeader>
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

            <Container maxW={"3xl"}></Container>

            <br />

            <Text fontWeight="600" color={"gray.600"}>
              Approx. Gas Fee - Subsidized by Paymsaster
            </Text>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"green.200"}
              _hover={{
                bg: "green.300",
                fontWeight: "700",
              }}
              onClick={onClose}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
