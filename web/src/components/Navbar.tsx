import { Flex, Box, Link, Center } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const hover = {
    textDecoration: "none",
  };
  const style = {
    fontSize: "36px",
    fontFamily: "Amatic SC, cursive",
  };
  let page = (
    <>
      <NextLink href="#">
        <Link
          _hover={hover}
          mt={"auto"}
          mb={"auto"}
          color="white"
          style={style}
        >
          Home
        </Link>
      </NextLink>
      <NextLink href="#">
        <Link _hover={hover} style={style} color="white" ml={5}>
          About us
        </Link>
      </NextLink>
    </>
  );

  let user = (
    <>
      <NextLink href="#">
        <Link _hover={hover} style={style} color="#6dd5fa" mr={5}>
          Login
        </Link>
      </NextLink>
      <NextLink href="#">
        <Link _hover={hover} style={style} color="#6dd5fa">
          Register
        </Link>
      </NextLink>
    </>
  );

  return (
    <Flex
      bg={"#2980b9"}
      bgGradient={"linear(to-r, #2980b9, #6dd5fa, #ffffff)"}
      p={"5"}
      fontFamily={"monospace"}
    >
      <Box mr={"auto"}>{page}</Box>
      <Box mr={"auto"} ml={"auto"}>
        DV Organizator
      </Box>
      <Box ml={"auto"}>{user}</Box>
    </Flex>
  );
};
