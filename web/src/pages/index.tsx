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
  color,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/image";
// @ts-ignore
import img from "../img/main.png";
import { Feature } from "../components/Feature";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useTranslation } from "next-i18next";
import { bgColor } from "../utils/colorModeColors";

const Index = () => {
  const { t } = useTranslation("data", { useSuspense: false });
  const { colorMode } = useColorMode();
  const bg = useColorModeValue(bgColor.light, bgColor.dark);
  const headerColor = useColorModeValue("blue.400", "brand.100");
  const textColor = useColorModeValue("primary.800", "brand.200");
  const btnColor = useColorModeValue("blue.400", "transparent");
  const btnBorderColor = useColorModeValue("none", "brand.200");
  const btnTextColor = useColorModeValue("white", "brand.200");
  const featureBorderColor = useColorModeValue("black", "brand.200");
  return (
    <Layout
      // @ts-ignore
      bg={bg}
      navbarVariant={"normal"}
      variant={"column"}
      navbar={true}
    >
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
        maxW={["100%", "100%", "100%", "80%", "80%"]}
        bg={bg}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
          bg={bg}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            // color="blue.400"
            textAlign={["center", "center", "left", "left"]}
            bg={bg}
            color={headerColor}
          >
            {t("index.picture-data.main-header")}
          </Heading>
          <Heading
            as="h2"
            size="md"
            color={textColor}
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
            bg={bg}
          >
            {t("index.picture-data.second-header")}
          </Heading>
          <NextLink href="/register">
            <Button
              variant={colorMode === "dark" ? "outline" : "solid"}
              borderColor={btnBorderColor}
              bg={btnColor}
              color={btnTextColor}
              className="nav-item"
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
            color={textColor}
            opacity="0.6"
          >
            {t("index.picture-data.small-text")}
          </Text>
        </Stack>
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Image src={img} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>
      <Flex pb={"2rem"} maxW={["100%", "100%", "100%", "80%", "80%"]}>
        <Stack>
          <Flex
            ml={{
              xs: "2rem",
              sm: "5rem",
              md: "8rem",
              lg: "12rem",
              xl: "15rem",
            }}
            pt={1}
            mb={1}
            pb={"1rem"}
          >
            <Heading color={headerColor}>{t("index.headers.wwd")}</Heading>
          </Flex>
          <br />
          <br />
          <Stack
            bg={bg}
            spacing={8}
            justify={{
              base: "center",
              md: "space-around",
              xl: "space-between",
            }}
            direction={{ base: "column-reverse", md: "row" }}
          >
            <Feature
              //@ts-ignore
              color={textColor}
              borderColor={featureBorderColor}
              title={t("index.features.feature-1.title").toString()}
              desc={t("index.features.feature-1.desc")}
            />
            <Feature
              //@ts-ignore
              color={textColor}
              borderColor={featureBorderColor}
              title={t("index.features.feature-2.title")}
              desc={t("index.features.feature-2.desc")}
            />
            <Feature
              //@ts-ignore
              color={textColor}
              borderColor={featureBorderColor}
              title={t("index.features.feature-3.title")}
              desc={t("index.features.feature-3.desc")}
            />
          </Stack>
          <Stack
            bg={bg}
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
              //@ts-ignore
              color={textColor}
              borderColor={featureBorderColor}
              title={t("index.features.feature-4.title")}
              desc={t("index.features.feature-4.desc")}
            />
            <Feature
              //@ts-ignore
              color={textColor}
              borderColor={featureBorderColor}
              title={t("index.features.feature-5.title")}
              desc={t("index.features.feature-5.desc")}
            />
          </Stack>
        </Stack>
      </Flex>
      {/* Reviews */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
