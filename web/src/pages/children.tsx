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
import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

interface ChildrenProps {}

const Children: React.FC<ChildrenProps> = ({}) => {
  useIsAuth();
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
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t("children.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("children.alert.desc")}
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("children.main-header")}</title>

      <Flex>
        <HStack spacing={10}>
          <Heading color="blue.400">{t("children.main-header")}</Heading>
          <NextLink href="create-child">
            <Button
              bg="blue.400"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              ml={"2rem"}
            >
              {t("children.btn-add")}
            </Button>
          </NextLink>
        </HStack>
      </Flex>
      <Box>
        {fetching && !data ? (
          <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Table m={10}>
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
                        <Button
                          bg="blue.400"
                          colorScheme="navItem"
                          borderRadius="12px"
                          py="4"
                          px="4"
                          lineHeight="1"
                          size="md"
                          ml={"2rem"}
                        >
                          Edit
                        </Button>
                      </NextLink>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        borderRadius="12px"
                        lineHeight="1"
                        size="md"
                        onClick={() => {
                          deleteChildren({
                            id: child.Id,
                          });
                        }}
                      >
                        Delete
                      </Button>
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Children);
