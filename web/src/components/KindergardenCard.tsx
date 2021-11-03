import { IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Divider, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import {
  useDeleteKindergardenMutation,
  useUseKindergardenMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

interface KindergardenCardProps {
  owning: {
    __typename?: "KinderGarden";
    Id: number;
    Name: string;
    City: string;
    Address: string;
    Zipcode: number;
  };
  partof?: boolean;
}

export const KindergardenCard: React.FC<KindergardenCardProps> = ({
  owning,
  partof = false,
}) => {
  const [, useKindergarden] = useUseKindergardenMutation();
  const [, deleteKindergarden] = useDeleteKindergardenMutation();
  const toast = useToast();
  const { t } = useTranslation();
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" shadow="xl">
      <Flex justify="right">
        {!partof ? (
          <IconButton
            aria-label="Delete kindergarden"
            icon={<CloseIcon />}
            variant="ghost"
            onClick={async () => {
              const { error } = await deleteKindergarden({
                id: owning.Id,
              });
              if (error) {
                toast({
                  title: t("dashboard.toast.error.title"),
                  description: t("dashboard.toast.error.desc"),
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: t("dashboard.toast.delete.title"),
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          />
        ) : null}
      </Flex>
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
          <NextLink
            href={"/kindergarden/[id]"}
            as={`/kindergarden/${owning.Id}`}
          >
            <Link
              color="blue.400"
              style={{
                fontSize: "26px",
                fontWeight: "bold",
              }}
              onClick={() => {
                useKindergarden({ kindergardenID: owning.Id });
              }}
            >
              {owning.Name}
            </Link>
          </NextLink>
        </Box>
        <Divider />
        <Box mt={3}>
          <Text>{owning.Address}</Text>
          <Text>{owning.City}</Text>
          <Text>{owning.Zipcode}</Text>
        </Box>
      </Box>
    </Box>
  );
};
