import { MinusIcon } from "@chakra-ui/icons";
import { Box, Divider, Stack, Text } from "@chakra-ui/layout";
import { Heading, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useUpdateChildrenParentsMutation } from "../generated/graphql";
import { ChildDataType, ParentDataTypes, ParentTypes } from "../utils/types";

interface ParentCardProps {
  data: ParentDataTypes;
  layout?: boolean;
  parent?: ParentTypes;
  child: ChildDataType;
}

export const ParentCard: React.FC<ParentCardProps> = ({
  data,
  layout,
  parent,
  child,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [, updateParents] = useUpdateChildrenParentsMutation();
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
      <Stack>
        <HStack spacing={10}>
          {parent == "father" ? (
            <Heading color="blue.400">
              {t("edit-child.drawer.tbl-father")}
            </Heading>
          ) : null}
          {parent == "mother" ? (
            <Heading color="blue.400">
              {t("edit-child.drawer.tbl-mother")}
            </Heading>
          ) : null}
          <IconButton
            aria-label="Add parents"
            icon={<MinusIcon />}
            color="white"
            colorScheme="yellow"
            _hover={{
              backgroundColor: "#719ABC",
            }}
            onClick={() => {
              if (parent == "mother") {
                updateParents({
                  childId: child.Id,
                  motherId: undefined,
                  fatherId: child.fatherId,
                });
              } else if (parent == "father") {
                updateParents({
                  childId: child.Id,
                  motherId: child.motherId,
                  fatherId: undefined,
                });
              }
            }}
          />
        </HStack>
        <Divider mt="5" mb="2" borderColor="#E2E8F0" />
        <Box>
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
      </Stack>
    </Box>
  );
};
