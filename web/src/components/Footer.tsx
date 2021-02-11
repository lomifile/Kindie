import { Box, Center, Divider, Link } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const logo = {
    fontSize: "36px",
    fontFamily: "Amatic SC, cursive",
  };
  return (
    <Box className="footer" p={"2rem"}>
      <Center style={logo}>DV Organizator</Center>
      <Divider
        mt={5}
        mr={"auto"}
        ml={"auto"}
        style={{ color: "black", backgroundColor: "black" }}
        width={250}
      />
      <Center mt={5}>
        <Link
          color={"white"}
          _hover={{ textDecoration: "none" }}
          style={{ textTransform: "uppercase", fontSize: "12px" }}
          href="#"
        >
          Privacy policy
        </Link>
        <Link
          color={"white"}
          _hover={{ textDecoration: "none" }}
          style={{ textTransform: "uppercase", fontSize: "12px" }}
          href="#"
          ml={5}
        >
          Terms and conditions
        </Link>
      </Center>
    </Box>
  );
};
