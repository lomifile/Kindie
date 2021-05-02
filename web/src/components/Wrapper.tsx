import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant =
  | "column"
  | "regular"
  | "small"
  | "flex"
  | "flex-nocenter";

interface WrapperProps {
  variant?: WrapperVariant;
  border?: string;
  borderColor?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
  border,
  borderColor,
  ...props
}) => {
  let body;

  if (variant == "column") {
    body = (
      <Flex
        direction="column"
        m="0 auto"
        mx="auto"
        w="100%"
        p={5}
        align={["none", "none", "none", "center", "center"]}
        maxW={["1200px", "1200px", "1200px", "none", "none"]}
        {...props}
      >
        {children}
      </Flex>
    );
  } else if (variant == "regular") {
    body = (
      <Box
        m={8}
        borderTop={border}
        borderColor={borderColor}
        mx="auto"
        maxW={"800px"}
        w="100%"
        {...props}
      >
        {children}
      </Box>
    );
  } else if (variant == "small") {
    body = (
      <Box {...props} m={8} mx="auto" maxW={"400px"} w="100%">
        {children}
      </Box>
    );
  } else if (variant == "flex") {
    body = (
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        borderTop={border}
        borderColor={borderColor}
        {...props}
      >
        {children}
      </Flex>
    );
  } else if (variant == "flex-nocenter") {
    body = (
      <Flex
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        borderTop={border}
        borderColor={borderColor}
        {...props}
      >
        {children}
      </Flex>
    );
  } else {
    body = (
      <>
        <div>You didn't input wrapper size!</div>
      </>
    );
  }
  return body;
};
