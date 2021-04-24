import { Box, Text } from "@chakra-ui/layout";
import React from "react";

interface ParentCardProps {
  data: object;
}

export const ParentCard: React.FC<ParentCardProps> = ({ data }) => {
  return (
    <Box
      mb={"5rem"}
      mt={5}
      borderRadius="12px"
      border={"1px"}
      borderColor="blue.400"
      p={5}
    >
      <Text>Name: {data.Name}</Text>
      <Text>Last name: {data.Surname}</Text>
      <Text>Email: {data.Email}</Text>
      <Text>Phone: {data.Phone}</Text>
    </Box>
  );
};
