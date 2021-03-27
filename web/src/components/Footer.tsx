import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

type Variant = "small" | "regular";

interface FooterProps {
  variant?: Variant;
}

export const Footer: React.FC<FooterProps> = ({ variant = "regular" }) => {
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
            href="/contact"
            color="secondary.link"
          >
            Contact Us
          </Link>
        </Stack>
        <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
          <Text color="secondary.link">&copy; {year}</Text>
          <Link href="/" color="secondary.link" fontWeight="bold">
            DV Organizator
          </Link>
          <Text color="secondary.link">&mdash; All rights reserved</Text>
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
              Contact Us
            </Link>
          </Stack>
          <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="m">
            <Text color="white">&copy; {year}</Text>
            <Link href="/" color="white" fontWeight="bold">
              DV Organizator
            </Link>
            <Text color="white">&mdash; All rights reserved</Text>
          </Stack>
        </Box>
      </Flex>
    );
  }
  return body;
};
