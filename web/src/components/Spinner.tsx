import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const CustomSpinner = ({}) => {
  return (
    <Flex
      p={[0, 0, 200, 200, 200]}
      alignItems="center"
      minHeight="100%"
      width="100%"
      justifyContent="center"
      justifySelf="center"
      justify={{
        s: "center",
        md: "center",
        xl: "center",
      }}
      flexDirection="column"
      mt={["-0", "-0", "-0", "auto", "auto"]}
      mb={["-0", "-0", "-0", "auto", "auto"]}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.400"
        size="xl"
        minH={["100px", "100px", "200px", "200px", "200px"]}
        minW={["100px", "100px", "200px", "200px", "200px"]}
      />
    </Flex>
  );
};
