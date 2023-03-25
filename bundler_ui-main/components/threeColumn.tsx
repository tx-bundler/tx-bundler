import { ReactElement } from "react";
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
  Button
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import styles from "../styles/Home.module.css";

const Feature = ({ title, text }: any) => {
  return (
    <Stack>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={0}>
      <SimpleGrid columns={{ base: 1 , md: 3 }} spacing={24}>
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Source
          </Text>
          {/* TODO: Display - USDC Pool Amount, chain, protocol, funds amount in native AND USD, LP position health, */}
        </Container>
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Convert
          </Text>
          {/* TODO: Display - Simple Swap, Source Currenct selected <-> Selected Currency, Take Uniswap Container */}
        </Container>
        
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Destination
          </Text>

          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size='lg' colorScheme={'green'} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
              vilatik.eth
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size='lg' colorScheme={'green'} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
              FurkanSezal.eth
            </FormLabel>
          </FormControl>
          <FormControl display="flex" alignItems="center" py={8}>
            <Switch id="wallet1" px={4} size='lg' colorScheme={'green'} />
            <FormLabel htmlFor="email-alerts" mb="0" fontSize="xl">
            0x7c43370367fa81D4FE9CE6161Fe60AFFfe7c8bAA
            </FormLabel>
          </FormControl>
          <br />
          <Button display="flex" alignItems="center" fontWeight="bolder" px={24} py={8}>
            + Link New Wallet
          </Button>
          {/* TODO: Display - Destination Wallets(linked wallets), Add new Wallet */}
        </Container>
      </SimpleGrid>
    </Box>
  );
}
