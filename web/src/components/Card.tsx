import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface CardProps {
  imageSrc?: string;
  cardTitle?: string;
  cardText?: string;
}

export const Card: React.FC<CardProps> = ({
  cardTitle,
  imageSrc,
  cardText,
}) => {
  return (
    <Box
      maxW="sm"
      borderWidth={["0", "0", "0", "1px", "1px"]}
      borderRadius="20px"
      shadow="lg"
    >
      <Box p="6">
        <Image src={imageSrc} />
        <Box mt="5" fontWeight="semibold" as="h1" lineHeight="tight">
          {cardTitle}
        </Box>
        {!cardText ? null : <Box mt={3}>{cardText}</Box>}
      </Box>
    </Box>
  );
};
