import { ReactElement, useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
  Switch,
  FormControl,
  FormLabel,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import styles from "../styles/Home.module.css";
// import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { ethers } from "ethers";
import dynamic from "next/dynamic";

const Feature = ({ title, text }: any) => {
  return (
    <Stack>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

const SwapWidget = dynamic(
  async () => {
    const res = await import("@uniswap/widgets");
    return res.SwapWidget;
  },
  { ssr: false }
);

export default function SimpleThreeColumns() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
    }
  }, []);

  return (
    <Box maxWidth="none">
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={32}>
        <Container sx={{ width: "150%" }} centerContent>
          {/* TODO: Display - USDC Pool Amount, chain, protocol, funds amount in native AND USD, LP position health, */}
          <Text fontSize="2xl" color="orange.300" as="b">
            Source
          </Text>
          <br />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={32}>
          <Text fontSize="xl" color="gray.200" as="b">
            ETH on AAVE zkSync
          </Text>
          <Button
            display="flex"
            alignItems="center"
            fontWeight="bolder"
            px={24}
            py={8}
            bgColor={"green.300"}
            _hover={{
              bgColor: "green",
              transition: "all 1s ease",
            }}
          >
            1.2 ETH ($2,180.32)
          </Button>
          </SimpleGrid>
          <br /><br />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={32}>
          <Text fontSize="xl" color="gray.200" as="b">
            USDC on AAVE zkSync
          </Text>
          <Button
            display="flex"
            alignItems="center"
            fontWeight="bolder"
            px={24}
            py={8}
            bgColor={"green.300"}
            _hover={{
              bgColor: "green",
              transition: "all 1s ease",
            }}
          >
            1400 ($1,400.32)
          </Button>
          </SimpleGrid>
          <br /><br />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={32}>
          <Text fontSize="lg" color="gray.200" as="b">
            USDC on Stargate zkSync
          </Text>
          <Button
            display="flex"
            alignItems="center"
            fontWeight="bolder"
            px={24}
            py={8}
            bgColor={"green.300"}
            _hover={{
              bgColor: "green",
              transition: "all 1s ease",
            }}
          >
            420 ($420.42)
          </Button>
          </SimpleGrid>
        </Container>
        <Container maxW={"sm"}>
          <Text fontSize="2xl" color="orange.400" as="b">
            Convert
          </Text>
          <br /><br />
          {/* TODO: Display - Simple Swap, Source Currenct selected <-> Selected Currency, Take Uniswap Container */}
          <div className="Uniswap">
            <SwapWidget
              provider={provider}
              jsonRpcUrlMap={{
                1: [
                  "https://zksync2-testnet.zksync.dev/4cFAs0QuovChZUauL9BpUusRb7wHwUYa",
                ],
              }}
            />
          </div>
        </Container>

        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Destination
          </Text>

          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size="lg" colorScheme={"green"} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
              vilatik.eth
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size="lg" colorScheme={"green"} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
              FurkanSezal.eth
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size="lg" colorScheme={"green"} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
              0x7c43370367fa81D4FE9CE6161Fe60AFFfe7c8bAA
            </FormLabel>
          </FormControl>
          <br />
          <Input
            maxW={"sm"}
            fontWeight={700}
            placeholder="Enter Address to Link"
            onChange={(e) => setUsdcAmount(parseInt(e.target.value, 10))}
          ></Input>
          <br />
          <br />
          {/* TODO: Display - Destination Wallets(linked wallets), Add new Wallet */}
        </Container>
      </SimpleGrid>
    </Box>
  );
}
