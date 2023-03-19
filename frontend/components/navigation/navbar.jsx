import { ConnectButton } from "@rainbow-me/rainbowkit";
// import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

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
import ZKS from "../../public/zks.png";

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
              <Image
                src={ZKS}
                alt="logo"
                width={180}
                height={180}
                onClick={() => router.push("/")}
              />
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
              <Link
                _hover={{
                  color: "orange.500",
                }}
                onClick={() => router.push("/")}
              >
                Home
              </Link>
              <Link
                _hover={{
                  color: "orange.500",
                }}
                onClick={() => router.push("/your-zaaps")}
              >
                Your zAAps
              </Link>
              {/* <Link onClick={() => router.push("/swap")}>Swap</Link> */}
              <Link
                _hover={{
                  color: "orange.500",
                }}
                onClick={() => router.push("/bundler")}
              >
                Bundler
              </Link>
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
