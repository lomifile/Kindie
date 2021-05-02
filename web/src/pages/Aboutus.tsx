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
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/Card";
import { Feature } from "../components/Feature";
import { Layout } from "../components/Layout";
// @ts-ignore
import filipImg from "../img/filipivanusec.jpg";
import { bgColor } from "../utils/colorModeColors";
import { createUrqlClient } from "../utils/createUrqlClient";
import { AdBanner } from "../components/AdBanner";

interface AboutusProps {}

const Aboutus: React.FC<AboutusProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const { colorMode } = useColorMode();
  const bg = useColorModeValue(bgColor.light, bgColor.dark);
  const headerColor = useColorModeValue("blue.400", "brand.100");
  const textColor = useColorModeValue("primary.800", "brand.200");
  const btnColor = useColorModeValue("blue.400", "transparent");
  const btnBorderColor = useColorModeValue("none", "brand.200");
  const btnTextColor = useColorModeValue("white", "brand.200");
  const featureBorderColor = useColorModeValue("black", "brand.200");
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
    <Layout
      // @ts-ignore
      bg={bg}
      navbarVariant={"normal"}
      variant={"column"}
      navbar={true}
    >
      <title>{t("about-us.main-heading")}</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "center", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="50vh"
        maxW={["100%", "100%", "100%", "80%", "80%"]}
        bg={bg}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
          bg={bg}
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
            <Heading color={headerColor}>{t("about-us.main-heading")}</Heading>
          </Flex>
          <Heading
            as="h2"
            size="md"
            color={textColor}
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
            color={textColor}
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {t("about-us.text.column-two")}
          </Heading>
        </Box>
      </Flex>
      <Divider
        maxW={["100%", "100%", "100%", "80%", "80%"]}
        borderColor={btnBorderColor}
      />
      <Flex pt={"3rem"} pb={3}>
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
            <Heading color={headerColor}>{t("about-us.meet")}</Heading>
          </Flex>
          {text.devs.map((dev) => (
            <Card
              // @ts-ignore
              borderColor={btnBorderColor}
              color={headerColor}
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
