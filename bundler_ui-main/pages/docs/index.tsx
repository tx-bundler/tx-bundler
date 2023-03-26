import React from "react";
import Image from "next/image";
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
} from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import ZKS from "../public/zks.png";

export default function Docs() {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
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
              Explore the
              <br />
              <Text as={"span"} fontWeight={700} color={"yellow.500"}>
                Contracts.
              </Text>
            </Heading>

            <Container centerContent maxW={"3xl"}>
              <Text
                color={"orange.100"}
                fontWeight={500}
                fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
                onClick={() =>
                  router.push(
                    "https://goerli.explorer.zksync.io/address/0x97550385F79B32F377a64230927b8516254F009C"
                  )
                }
              >
                AAFactory
              </Text>
              <br />
              <br />
              <Text
                color={"white"}
                fontWeight={500}
                lineHeight={"120%"}
                fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
              >
                The AAFactory constructor takes a _aaBytecodeHash parameter,
                which is a hash of the bytecode used to deploy the AA contract.
                <br />
                <br />
                The deployAccount function takes a salt parameter, which is used
                to deterministically generate the address of the new AA
                contract, and an owner parameter, which is the Ethereum address
                that will own the account.
                <br />
                <br />
                The function then calls the create2Account function of the
                DEPLOYER_SYSTEM_CONTRACT using the SystemContractsCaller
                library. If the deployment is successful, the function returns
                the address of the newly created AA contract.
                <br />
                <br />
                In summary, this contract is used to deploy account abstraction
                contracts for batching transactions in the zkSync scaling
                solution.
                <br />
              </Text>
            </Container>

            <Container centerContent maxW={"3xl"}>
              <Text
                color={"orange.100"}
                fontWeight={500}
                fontSize={{ base: "2xl", sm: "2xl", md: "4xl" }}
                onClick={() =>
                  router.push(
                    "https://goerli.explorer.zksync.io/address/0x97550385F79B32F377a64230927b8516254F009C"
                  )
                }
              >
                AbstractAccount.sol
              </Text>
              <br />
              <br />
              <Text
                color={"white"}
                fontWeight={500}
                lineHeight={"120%"}
                fontSize={{ base: "xl", sm: "xl", md: "2xl" }}
              >
                This Solidity code is a contract that defines an abstract
                account. An abstract account is an account that can store
                digital assets on the Ethereum network. The account has a
                non-constant address that can be used to store and transfer
                digital assets, and an owner who can transfer ownership of the
                account to another party. The code uses several other smart
                contracts to perform its functions, such as
                TransactionHelper.sol, Constants.sol, SystemContractsCaller.sol,
                and IERC1271.sol.
                <br />
                <br />
                The contract defines several functions that can be used to
                manage and validate transactions associated with the abstract
                account. The contract uses the TransactionHelper library to get
                the hash of a transaction, and the ECDSA library to verify a
                digital signature associated with a transaction.
                <br />
                <br />
                The AbstractAccount contract has several modifiers that restrict
                access to certain functions. For example, the onlyBootloader
                modifier restricts access to certain functions to the bootloader
                address.
                <br />
                <br />
                The AbstractAccount contract inherits from two other contracts:
                IAccount and IERC1271. The IAccount contract defines functions
                to validate and execute transactions. The IERC1271 contract
                defines a standard interface for contract-based account
                signatures.
                <br />
              </Text>
            </Container>
          </Stack>
          <Button
            fontSize="24px"
            transition={"all 0.3s ease"}
            colorScheme={"blue"}
            bgImage={
              "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
            }
            border={"1"}
            rounded={"full"}
            px={12}
            py={8}
            _hover={{
              border: "1px solid rgba(var(--primary-color), 0.5)",
              color: "yellow",
              transition: "all 2s ease",
            }}
            onClick={() => router.push("/docs")}
          >
            Previous
          </Button>

          <Button
            fontSize="24px"
            transition={"all 0.3s ease"}
            colorScheme={"blue"}
            bgImage={
              "linear-gradient(to right, rgb(1 134 218), rgb(182 49 167))"
            }
            border={"1"}
            rounded={"full"}
            px={12}
            py={8}
            _hover={{
              border: "1px solid rgba(var(--primary-color), 0.5)",
              color: "yellow",
              transition: "all 2s ease",
            }}
            onClick={() => router.push("/docs")}
          >
            Next
          </Button>
        </Container>
      </main>
    </div>
  );
}
