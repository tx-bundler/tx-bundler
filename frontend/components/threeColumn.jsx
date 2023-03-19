import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Container,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text }) => {
  return (
    <Stack>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={24}>
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Source
          </Text>
          {/* Displayed - USDC Pool Amount, chain, protocol, funds amount in native AND USD, LP position health, */}
        </Container>
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Convert
          </Text>
          {/* Displayed - Simple Swap, Source Currenct selected <-> Selected Currency, Take Uniswap Container */}
        </Container>
        <Container>
          <Text fontSize="2xl" color="orange.500" as="b">
            Destination
          </Text>
          {/* Displayed - Destination Wallets(linked wallets), Add new Wallet */}
        </Container>
      </SimpleGrid>
    </Box>
  );
}
