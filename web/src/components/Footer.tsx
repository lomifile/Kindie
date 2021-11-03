import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import isElectron from "is-electron";
import React from "react";
import { useTranslation } from "react-i18next";

type Variant = "small" | "regular";

interface FooterProps {
  variant?: Variant;
}

export const Footer: React.FC<FooterProps> = ({ variant = "regular" }) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  let body;
  if (variant == "small") {
    body = (
      <>
        <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
          <Link
            className="footer-nav-item"
            href="/terms"
            color="secondary.link"
          >
            Terms
          </Link>
          <Link
            className="footer-nav-item"
            href="/privacy-policy"
            color="secondary.link"
          >
            Privacy Policy
          </Link>
          <Link
            className="footer-nav-item"
            href={isElectron() ? null : "/contact"}
            color="secondary.link"
          >
            {t("footer.contact")}
          </Link>
        </Stack>
        <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
          <Text color="secondary.link">&copy; {year}</Text>
          <Link
            href={isElectron() ? null : "/"}
            color="secondary.link"
            fontWeight="bold"
          >
            Kindie
          </Link>
          <Text color="secondary.link">&mdash; {t("footer.rights")}</Text>
        </Stack>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center" justify="center" bg="dimgray">
        <Box pt={"2.5rem"} pb={"1.5rem"}>
          <Center>
            <Heading textTransform={"uppercase"} color="white" as={"h6"}>
              Kindie
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
              Kindie
            </Link>
            <Text color="white">&mdash; {t("footer.rights")}</Text>
          </Stack>
        </Box>
      </Flex>
    );
  }
  return body;
};
