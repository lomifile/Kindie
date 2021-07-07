import { Box, Divider, Stack, Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface ParentCardProps {
  data: any;
  layout?: boolean;
  parent?: string;
}

export const ParentCard: React.FC<ParentCardProps> = ({
  data,
  layout,
  parent,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  if (!layout) {
    return (
      <Stack>
        <Text>
          {t("parent-card.name")}: {data?.Name}
        </Text>
        <Text>
          {t("parent-card.surname")}: {data?.Surname}
        </Text>
        <Text>
          {t("parent-card.email")}: {data?.Email}
        </Text>
        <Text>
          {t("parent-card.phone")}: {data?.Phone}
        </Text>
      </Stack>
    );
  }
  return (
    <Box
      mb={"5rem"}
      mt={5}
      borderRadius="12px"
      border={"1px"}
      borderColor="blue.400"
      p={5}
    >
      {parent == "father" ? (
        <Heading color="blue.400">{t("edit-child.drawer.tbl-father")}</Heading>
      ) : null}
      {parent == "mother" ? (
        <Heading color="blue.400">{t("edit-child.drawer.tbl-mother")}</Heading>
      ) : null}
      <Divider mt="5" mb="5" borderColor="#E2E8F0" />
      <Text>
        {t("parent-card.name")}: {data?.Name}
      </Text>
      <Text>
        {t("parent-card.surname")}: {data?.Surname}
      </Text>
      <Text>
        {t("parent-card.email")}: {data?.Email}
      </Text>
      <Text>
        {t("parent-card.phone")}: {data?.Phone}
      </Text>
    </Box>
  );
};
