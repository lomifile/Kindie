import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

// @ts-ignore
interface CardProps {
  // @ts-ignore
  icon?: IntrinsicAttributes & CardProps & { children?: ReactNode };
  imageSrc?: string;
  cardTitle?:
    | string
    // @ts-ignore
    | (IntrinsicAttributes & CardProps & { children?: ReactNode });
  cardText?:
    | string
    // @ts-ignore
    | (IntrinsicAttributes & CardProps & { children?: ReactNode });
}

export const Card: React.FC<CardProps> = ({
  cardTitle,
  imageSrc,
  cardText,
  icon,
}) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
      {icon && !imageSrc ? (
        <Flex justify="right">{icon}</Flex>
      ) : (
        <Image src={imageSrc} />
      )}
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
          {cardTitle}
        </Box>
        {cardText ? null : <Box mt={3}>{cardText}</Box>}
      </Box>
    </Box>
  );
};
