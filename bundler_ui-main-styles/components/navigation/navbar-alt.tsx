import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const Links = [
  "Withdraw-Swap-Send",
  "Borrow-Swap-Send",
  "Withdraw-Swap-Deposit",
];

const NavLink = ({ children }: any) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("orange.300", "gray.700"),
    }}
    href={"/bundler/bss"}
  >
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>

          {/* Link Names defined above */}
          <HStack spacing={6} alignItems={"center"}>
            <Box fontSize={"lg"} color={"orange.600"} fontWeight={800}>
              Quick ZAAPS:
            </Box>
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
              fontSize="md"
              color="gray.800"
              fontWeight={500}
            >
              <Link
                _hover={{
                  padding: "1",
                  backgroundColor: "orange",
                  transition: "all 1s ease",
                }}
                onClick={() => router.push("/bundler/wss")}
              >
                Withdraw-Swap-Send
              </Link>
              <Link
                _hover={{
                  padding: "1",
                  backgroundColor: "orange",
                  transition: "all 1s ease",
                }}
                onClick={() => router.push("/bundler/bss")}
              >
                Borrow-Swap-Send
              </Link>
              <Link
                _hover={{
                  padding: "1",
                  backgroundColor: "orange",
                  transition: "all 1s ease",
                }}
                onClick={() => router.push("/bundler/wsd")}
              >
                Winthdraw-Swap-Deposit
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
