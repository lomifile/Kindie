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
    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
      <Image src={imageSrc} />
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
          {cardTitle}
        </Box>
        {!cardText ? null : <Box mt={3}>{cardText}</Box>}
      </Box>
    </Box>
  );
};
