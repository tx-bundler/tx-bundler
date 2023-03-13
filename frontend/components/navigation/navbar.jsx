import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Menu,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import DLOGO from "../../public/cw3d-logo.png";

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        marginBottom={20}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link href="/">
              <Image src={DLOGO} alt="logo" width={80} height={80} />
            </Link>
          </Box>

          <Flex>
            <Stack
              direction={"row"}
              spacing={20}
              paddingRight={10}
              display="flex"
              alignItems="center"
              as="b"
            >
              <Link href="/">Home</Link>
              <Link href="/swap">Swap</Link>
              <Link href="/">Docs</Link>
              <Box px={40}>
                <Menu>
                  <ConnectButton></ConnectButton>
                </Menu>
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
