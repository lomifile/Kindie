import { Flex, Stack, Heading, Box, Divider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
// @ts-ignore
import filipImg from "../img/filipivanusec.jpg";
import { createUrqlClient } from "../utils/createUrqlClient";
import { AdBanner } from "../components/AdBanner";

const Aboutus: React.FC<{}> = ({}) => {
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
        justify={{ base: "center", md: "center", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="50vh"
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Flex
            ml={{
              xs: "1rem",
              sm: "3rem",
              md: "8rem",
              lg: "12rem",
              xl: "15rem",
            }}
            pt={1}
            mb={1}
            pb={"1rem"}
          >
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
      <Flex pt={"3rem"} pb={3} mb="5">
        <Stack>
          <Flex
            justify={"center"}
            ml={{
              xs: "1rem",
              sm: "3rem",
              md: "10rem",
              lg: "12rem",
              xl: "15rem",
            }}
            mb={5}
            pb={"1rem"}
          >
            <Heading color="blue.400">{t("about-us.meet")}</Heading>
          </Flex>
          {/* @ts-ignore */}
          {text.devs.map((dev) => (
            <Card
              imageSrc={dev.devImg}
              cardTitle={dev.name}
              cardText={dev.about}
            />
          ))}
        </Stack>
      </Flex>
      <AdBanner />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Aboutus);
