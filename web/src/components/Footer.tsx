import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { bgColor } from "../utils/colorModeColors";

type Variant = "small" | "regular";

interface FooterProps {
  variant?: Variant;
}

export const Footer: React.FC<FooterProps> = ({ variant = "regular" }) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const year = new Date().getFullYear();
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("secondary.link", "brand.200");
  let body;
  if (variant == "small") {
    body = (
      <>
        <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
          <Link className="footer-nav-item" href="/terms" color={textColor}>
            Terms
          </Link>
          <Link
            className="footer-nav-item"
            href="/privacy-policy"
            color={textColor}
          >
            Privacy Policy
          </Link>
          <Link className="footer-nav-item" href="/contact" color={textColor}>
            {t("footer.contact")}
          </Link>
        </Stack>
        <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
          <Text color={textColor}>&copy; {year}</Text>
          <Link href="/" color={textColor} fontWeight="bold">
            DV Organizator
          </Link>
          <Text color={textColor}>&mdash; {t("footer.rights")}</Text>
        </Stack>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center" justify="center" bg="dimgray">
        <Box pt={"2.5rem"} pb={"1.5rem"}>
          <Center>
            <Heading textTransform={"uppercase"} color="white" as={"h6"}>
              DV Organizator
            </Heading>
          </Center>
          <Stack
            isInline
            marginTop="1.5rem"
            fontWeight="500"
            fontSize="l"
            align="center"
            justify="center"
            direction={["column", "row"]}
          >
            <Link className="footer-nav-item" href="/terms" color="white">
              Terms
            </Link>
            <Link
              className="footer-nav-item"
              href="/privacy-policy"
              color="white"
            >
              Privacy Policy
            </Link>
            <Link className="footer-nav-item" href="/contact" color="white">
              {t("footer.contact")}
            </Link>
          </Stack>
          <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="m">
            <Text color="white">&copy; {year}</Text>
            <Link href="/" color="white" fontWeight="bold">
              DV Organizator
            </Link>
            <Text color="white">&mdash; {t("footer.rights")}</Text>
          </Stack>
        </Box>
      </Flex>
    );
  }
  return body;
};
