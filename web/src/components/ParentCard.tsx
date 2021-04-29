import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { useTranslation } from "react-i18next";

interface ParentCardProps {
  data: object;
}

export const ParentCard: React.FC<ParentCardProps> = ({ data }) => {
  const { t } = useTranslation("data", { useSuspense: false });
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
        {t("parent-card.name")}:{" "}
        {
          // @ts-ignore
          data.Name
        }
      </Text>
      <Text>
        {t("parent-card.surname")}:{" "}
        {
          // @ts-ignore
          data.Surname
        }
      </Text>
      <Text>
        {t("parent-card.email")}:{" "}
        {
          // @ts-ignore
          data.Email
        }
      </Text>
      <Text>
        {t("parent-card.phone")}:{" "}
        {
          // @ts-ignore
          data.Phone
        }
      </Text>
    </Box>
  );
};
