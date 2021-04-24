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
      <Text>
        Name:{" "}
        {
          // @ts-ignore
          data.Name
        }
      </Text>
      <Text>
        Last name:{" "}
        {
          // @ts-ignore
          data.Surname
        }
      </Text>
      <Text>
        Email:{" "}
        {
          // @ts-ignore
          data.Email
        }
      </Text>
      <Text>
        Phone:{" "}
        {
          // @ts-ignore
          data.Phone
        }
      </Text>
    </Box>
  );
};
