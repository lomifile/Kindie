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
import { useTranslation } from "react-i18next";
import { Card } from "../components/Card";
import { Feature } from "../components/Feature";
import { Layout } from "../components/Layout";
// @ts-ignore
import filipImg from "../img/filipivanusec.jpg";
import { createUrqlClient } from "../utils/createUrqlClient";

interface AboutusProps {}

const Aboutus: React.FC<AboutusProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const text = {
    devs: [
      {
        name: t("about-us.text.devs.filip.name"),
        about: t("about-us.text.devs.filip.about"),
        devImg: filipImg,
      },
    ],
  };
  return (
    <Layout navbarVariant={"normal"} variant={"column"} navbar={true}>
      <title>{t("about-us.main-heading")}</title>
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
            <Heading color="blue.400">{t("about-us.main-heading")}</Heading>
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
            {t("about-us.text.column-one")}
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
            {t("about-us.text.column-two")}
          </Heading>
        </Box>
      </Flex>
      <Divider />
      <Flex pt={"3rem"} pb={5}>
        <Stack>
          <Flex ml={"12rem"} pb={"2rem"} pt={"1rem"}>
            <Heading color="blue.400">{t("about-us.meet")}</Heading>
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
