import { Heading } from "@chakra-ui/react";
import React from "react";

export const CustomHeader: React.FC<{}> = ({ children, ...props }) => {
  return (
    <Heading
      as="h1"
      size="xl"
      fontWeight="bold"
      color="blue.400"
      textAlign={["center", "center", "left", "left"]}
      {...props}
    >
      {children}
    </Heading>
  );
};
