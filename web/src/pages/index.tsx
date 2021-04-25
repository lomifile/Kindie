import { Layout } from "../components/Layout";
import {
  Box,
  Flex,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/image";
// @ts-ignore
import img from "../img/main.png";
import { Feature } from "../components/Feature";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <Layout navbarVariant={"normal"} variant={"column"} navbar={true}>
      <title>DV Organizator [ALPHA]</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={5}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="blue.400"
            textAlign={["center", "center", "left", "left"]}
          >
            Does your documentation need help?
          </Heading>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            We develpoed a way that will help you sort your documentation and
            make it better!
          </Heading>
          <NextLink href="/register">
            <Button
              bg="blue.400"
              className="nav-item"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
            >
              Create your account now
            </Button>
          </NextLink>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Image src={img} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>
      <Flex pb={"2rem"}>
        <Stack>
          <Flex ml={"12rem"} pt={1} mb={1} pb={"1rem"}>
            <Heading color="blue.400">What we do?</Heading>
          </Flex>
          <br />
          <br />
          <HStack spacing={8}>
            <Feature
              title="We store all of your data!"
              desc="All data that you provide and show us is stored in safe
            way, sou you can access it whenever you want."
            />
            <Feature
              title="Keep you organized!"
              desc="We made sure to create simple enough working teamplate so
            you can store your data where you need it."
            />
            <Feature
              title="Update our current features!"
              desc="Any bug that is developed during use, make sure to report
              it and we will make sure to fix it as soon as possible."
            />
          </HStack>
          <HStack pt={"5"} spacing={8}>
            <Feature
              title="Improve infrastructure!"
              desc="We know that fast and relialbe way is needed when we have
              large user base, so we make sure that our infrastructure
              is solid and working all the time!"
            />
            <Feature
              title="We listen and improve upon!"
              desc="If you have any problems or questions on certan things
              please make sure that you contact us using contact forms
              and we will make sure to respond to you in the just right
              way."
            />
          </HStack>
        </Stack>
      </Flex>
      {/* Reviews */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
