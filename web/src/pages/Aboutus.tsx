import {
  Flex,
  Stack,
  Heading,
  Link,
  Button,
  Box,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Card } from "../components/Card";
import { Feature } from "../components/Feature";
import { Layout } from "../components/Layout";
// @ts-ignore
import filipImg from "../img/filipivanusec.jpg";
import { createUrqlClient } from "../utils/createUrqlClient";

interface AboutusProps {}

const Aboutus: React.FC<AboutusProps> = ({}) => {
  const text = {
    columnOne:
      "In simple terms we are just another app that helps you get organised. \
        Trhough out the life I saw how porgress and paperwork for children in kindergarden gets bigger and bigger and the fact \
        that storing that much of data phisically is impossible and that is where I got and idea to just try to improve that kind of problem \
        this is where I got some of the ideas and what I turned into a project.",
    columnTwo:
      "What this app can do for your bussienes? \
        Well in simple terms gives you ability to create and store multiple kindergarden in one compact place \
        all of the data is presented to you using simple systems so you don't have to worry about anything. \
        Just sit back and fill our registration form and start sorting your data the way you like. We hope you will enjoy using it as much as we enjoyed working \
        and developing it.",
    devs: [
      {
        name: "Filip Ivanusec",
        about:
          "Hi! My name is Filip. I've been developing apps since I was 18 years old \
              When I saw how things around kindergarden and how much paperwork is about childern I wanted to find a way to make it simpler \
              I hope the solution you see here is something that is going to help you in your bussines. \
              Kind regards, Filip!",
        devImg: filipImg,
      },
    ],
  };
  return (
    <Layout navbarVariant={"normal"} variant={"column"} navbar={true}>
      <title>About us</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="50vh"
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Flex ml={"12rem"} pb={"1rem"}>
            <Heading color="blue.400">About us</Heading>
          </Flex>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {text.columnOne}
          </Heading>
        </Stack>
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <br />
          <br />
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {text.columnTwo}
          </Heading>
        </Box>
      </Flex>
      <Divider />
      <Flex pt={"3rem"} pb={5}>
        <Stack>
          <Flex ml={"12rem"} pb={"2rem"} pt={"1rem"}>
            <Heading color="blue.400">Meet the team</Heading>
          </Flex>
          {text.devs.map((dev) => (
            <Card
              imageSrc={dev.devImg}
              cardTitle={dev.name}
              cardText={dev.about}
            />
          ))}
        </Stack>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Aboutus);
