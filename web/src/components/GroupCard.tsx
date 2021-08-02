import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Box,
  HStack,
  IconButton,
  toast,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  DeleteGroupMutation,
  Exact,
  ShowGroupsQuery,
  UseGroupMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { OperationContext, OperationResult } from "urql";

interface GroupCardProps {
  data: ShowGroupsQuery;
  role: string;
  deleteGroup: (
    variables?: Exact<{
      id: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteGroupMutation,
      Exact<{
        id: number;
      }>
    >
  >;
  useGroup: (
    variables?: Exact<{
      groupId: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UseGroupMutation,
      Exact<{
        groupId: number;
      }>
    >
  >;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  data,
  role,
  deleteGroup,
  useGroup,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  return (
    <>
      <Flex justify={["center", "center", "center", "center", "left"]}>
        <Heading ml={["0", "0", "0", "10px", "10px"]} color="blue.400">
          {t("kindergarden.groups-heading")}
        </Heading>
      </Flex>
      <Flex align="center" justify="center" mb={5} mt={5}>
        <Box
          w={["100%", "100%", "100%", "400px", "400px"]}
          rounded={["xs", "sm", "md", "lg", "xl"]}
          p={5}
          style={{
            display: "block",
            width: "1200px",
            overflowY: "hidden",
            overflowX: "auto",
          }}
        >
          <HStack spacing={8} padding={5}>
            {data?.showGroups?.map((owning) => (
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                shadow="xl"
                key={owning.Id}
              >
                {role == "Headmaster" ? (
                  <Flex justify="right">
                    <IconButton
                      aria-label="Delete group"
                      icon={<CloseIcon />}
                      variant="ghost"
                      onClick={async () => {
                        const { error } = await deleteGroup({
                          id: owning.Id,
                        });
                        if (error) {
                          toast({
                            title: t("kindergarden.toast.error.title"),
                            description: t("kindergarden.toast.error.desc"),
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        } else {
                          toast({
                            title: t("kindergarden.toast.delete"),
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          });
                        }
                      }}
                    />
                  </Flex>
                ) : null}
                <Box p="6">
                  <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
                    <NextLink
                      href={"/group/[id]"}
                      as={`/group/${owning.Id}?name=${owning.Name}`}
                    >
                      <Link
                        color="blue.400"
                        style={{
                          fontSize: "26px",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          useGroup({ groupId: owning.Id });
                        }}
                      >
                        {owning.Name}
                      </Link>
                    </NextLink>
                  </Box>
                </Box>
              </Box>
            ))}
          </HStack>
        </Box>
      </Flex>
    </>
  );
};
