import { Heading } from "@chakra-ui/react";
import React from "react";

interface CustomHeaderProps {
  data: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  data,
  ...props
}) => {
  return (
    <Heading
      as="h1"
      size="xl"
      fontWeight="bold"
      color="blue.400"
      textAlign={["center", "center", "left", "left"]}
      {...props}
    >
      {data}
    </Heading>
  );
};
