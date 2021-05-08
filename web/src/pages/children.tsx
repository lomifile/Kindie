import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Flex,
  Heading,
  SkeletonText,
  Td,
  Button,
  HStack,
  Tooltip,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  IconButton,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  useDeleteChildrenMutation,
  useShowChildrenNotIngroupQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import NextLink from "next/link";
import {
  WarningIcon,
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const Children: React.FC<{}> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching, error }] = useShowChildrenNotIngroupQuery({
    variables,
  });

  const [, deleteChildren] = useDeleteChildrenMutation();

  if (!fetching && !data) {
    return (
      <Alerts
        status={"error"}
        name={t("children.alert.title")}
        data={t("children.alert.desc")}
      />
    );
  }

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("children.main-header")}</title>

      <Flex justify={["center", "center", "center", "center", "left"]}>
        <HStack spacing={5}>
          <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
            {t("children.main-header")}
          </Heading>
          <NextLink href="/create-child">
            <IconButton
              bg="blue.400"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              ml={"2rem"}
              aria-label={"Create child"}
              icon={<AddIcon />}
            />
          </NextLink>
        </HStack>
      </Flex>
      {/* THIS NEEDS TO BE FLEXED!! */}
      <Flex justify={"center"}>
        <Box
          w={["100%", "100%", "100%", "80%", "100%"]}
          display={["block", "block", "block", "block"]}
          overflowX={["auto", "auto", "hidden", "hidden"]}
        >
          {fetching && !data ? (
            <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          ) : (
            <Table mt={"2rem"}>
              <Thead>
                <Tr>
                  <Th>{t("children.tbl-name")}</Th>
                  <Th>{t("children.tbl-surname")}</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data!.showChildrenFilterNotInGroup.children.map((child) =>
                  !child ? null : (
                    <Tr>
                      <Td>{child.Name}</Td>
                      <Td ml={"2rem"}>{child.Surname}</Td>
                      <Td>
                        <NextLink
                          href={"/edit-child/[id]"}
                          as={`/edit-child/${child.Id}`}
                        >
                          <IconButton
                            aria-label="Edit"
                            icon={<EditIcon />}
                            bg="blue.400"
                            colorScheme="navItem"
                            borderRadius="12px"
                            py="4"
                            px="4"
                            lineHeight="1"
                            size="md"
                            ml={"2rem"}
                          />
                        </NextLink>
                      </Td>
                      <Td>
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          borderRadius="12px"
                          lineHeight="1"
                          size="md"
                          onClick={() => {
                            deleteChildren({
                              id: child.Id,
                            });
                          }}
                        />
                      </Td>
                      <Td>
                        {!child.fatherId || !child.motherId ? (
                          <Tooltip label="Some data is missing!">
                            <WarningIcon color={"yellow.400"} />
                          </Tooltip>
                        ) : (
                          <Tooltip label="All data is here!">
                            <CheckCircleIcon color={"green.400"} />
                          </Tooltip>
                        )}
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          )}
          {data && data.showChildrenFilterNotInGroup.hasMore ? (
            <Flex>
              <Button
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.showChildrenFilterNotInGroup.children[
                        data.showChildrenFilterNotInGroup.children.length - 1
                      ].createdAt,
                  });
                }}
                isLoading={fetching}
                m="auto"
                my={8}
                bg="blue.400"
                colorScheme="navItem"
                borderRadius="12px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
              >
                {t("children.btn-load-more")}
              </Button>
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Children);
