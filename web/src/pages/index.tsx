import { Layout } from "../components/Layout";
import { Box, Flex, Button, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import img from "../../public/img/main.png";
import { Feature } from "../components/Feature";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useTranslation, TFunction } from "react-i18next";
import GoogleAds from "../components/AdBanner";

const MainText = (t: TFunction<"data">) => (
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
      {t("index.picture-data.main-header")}
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
      {t("index.picture-data.second-header")}
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
        {t("index.picture-data.btn")}
      </Button>
    </NextLink>
    <Text
      fontSize="xs"
      mt={2}
      textAlign="center"
      color="primary.800"
      opacity="0.6"
    >
      {t("index.picture-data.small-text")}
    </Text>
  </Stack>
);

const Cards = (t: TFunction<"data">) => (
  <Flex
    p={"2"}
    justify={["center", "center", "center", "center", "center"]}
    align="center"
    mb={10}
  >
    <Stack>
      <Flex
        ml={{
          xs: "2rem",
          sm: "5rem",
          md: "8rem",
          lg: "12rem",
          xl: "15rem",
        }}
        p="5"
        mb="2"
      >
        <Heading color="blue.400">{t("index.headers.wwd")}</Heading>
      </Flex>
      <Stack
        spacing={8}
        justify={{
          base: "center",
          md: "space-around",
          xl: "space-between",
        }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Feature
          title={t("index.features.feature-1.title").toString()}
          desc={t("index.features.feature-1.desc")}
        />
        <Feature
          title={t("index.features.feature-2.title")}
          desc={t("index.features.feature-2.desc")}
        />
        <Feature
          title={t("index.features.feature-3.title")}
          desc={t("index.features.feature-3.desc")}
        />
      </Stack>
      <Stack
        pt={"5"}
        spacing={8}
        justify={{
          base: "center",
          md: "space-around",
          xl: "space-between",
        }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Feature
          title={t("index.features.feature-4.title")}
          desc={t("index.features.feature-4.desc")}
        />
        <Feature
          title={t("index.features.feature-5.title")}
          desc={t("index.features.feature-5.desc")}
        />
      </Stack>
    </Stack>
  </Flex>
);

const Index = () => {
  const { t } = useTranslation("data", { useSuspense: false });
  return (
    <Layout navbarVariant={"normal"} variant={"column"} navbar={true}>
      <title>Kindie [BETA]</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "center", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={5}
      >
        {MainText(t)}
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Image src={img} className="img" />
        </Box>
      </Flex>
      {Cards(t)}
      {/* Reviews */}
      <GoogleAds />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
