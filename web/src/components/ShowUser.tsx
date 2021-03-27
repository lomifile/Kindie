import { HStack, Text } from "@chakra-ui/react";
import React from "react";

interface ShowUserProps {
  title?: string;
  data?: string;
}

export const ShowUser: React.FC<ShowUserProps> = ({ title, data }) => {
  return (
    <HStack>
      <Text>{title}:</Text>
      <Text>{data}</Text>
    </HStack>
  );
};
