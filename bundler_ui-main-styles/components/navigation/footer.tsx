import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode, SVGProps } from "react";

export default function SmallWithLogoLeft() {
  return (
    <Box
      bgImage={"linear-gradient(to right, rgb(247 255 0), rgb(182 49 167))"}
      color={"black"}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        align={{ base: "center", md: "center" }}
      >
        <Text fontWeight={500}>
          © 2023 zAAp Protocol. All rights reserved
        </Text>
      </Container>
    </Box>
  );
}
