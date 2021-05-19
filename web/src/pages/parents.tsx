import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  SkeletonText,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import {
  useShowfatherQuery,
  useShowMotherQuery,
  useDeleteMotherMutation,
  useDeleteFatherMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { getUserRole } from "../utils/getUserRole";

const Parents: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const role = getUserRole();

  const [motherVariables, setMotherVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [fatherVariables, setFatherVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data: mother, fetching: motherFetching }] = useShowMotherQuery({
    variables: motherVariables,
  });
  const [{ data: father, fetching: fatherFetching }] = useShowfatherQuery({
    variables: fatherVariables,
  });

  const [, deleteMother] = useDeleteMotherMutation();
  const [, deleteFather] = useDeleteFatherMutation();

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("parents.main-header")}</title>
      {role == "Pedagogue" || role == "Headmaster" ? (
        <Stack spacing={8}>
          <Flex
            align="center"
            justify="center"
            mb={"2rem"}
            mt={5}
            border={["0", "0", "0", "0", "1px"]}
            borderColor={[
              "transparent",
              "transparent",
              "transparent",
              "blue.400",
              "blue.400",
            ]}
            borderRadius={"12px"}
            p={3}
          >
            <HStack p={2} spacing={4}>
              {role == "Headmaster" || role == "Pedagogue" ? (
                <NextLink href="/create-parents">
                  <Button
                    bg="blue.400"
                    className="nav-item"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                  >
                    {t("parents.btn-add")}
                  </Button>
                </NextLink>
              ) : null}
            </HStack>
          </Flex>
        </Stack>
      ) : null}
      <Flex
        align="center"
        justify={{ base: "center", md: "center", xl: "space-between" }}
        direction={{ base: "column", md: "column" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="20vh"
        mb={5}
      >
        {!(mother?.showMother.mother.length <= 0) ? (
          <Stack
            spacing={4}
            w={{ base: "100%", md: "100%" }}
            align={["center", "center", "center", "center", "center"]}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="blue.400"
              textAlign={["center", "center", "left", "left"]}
            >
              {t("parents.heading-mother")}
            </Heading>
            <Box
              w={["100%", "100%", "100%", "80%", "100%"]}
              display={["block", "block", "block", "block"]}
              overflowX={["auto", "auto", "hidden", "hidden"]}
            >
              {motherFetching && !mother ? (
                <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              ) : (
                <Table mt={"2rem"}>
                  <Thead>
                    <Tr>
                      <Th>{t("parents.tbl-name")}</Th>
                      <Th>{t("parents.tbl-surname")}</Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mother!.showMother.mother.map((mom) =>
                      !mom ? null : (
                        <Tr>
                          <Td>{mom.Name}</Td>
                          <Td ml={"2rem"}>{mom.Surname}</Td>
                          <Td>
                            {role == "Pedagogue" || role == "Headmaster" ? (
                              <NextLink
                                href={"/edit-parents/mother/[id]"}
                                as={`/edit-parents/mother/${mom.Id}`}
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
                            ) : null}
                          </Td>
                          <Td>
                            {role == "Pedagogue" || role == "Headmaster" ? (
                              <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                borderRadius="12px"
                                lineHeight="1"
                                size="md"
                                onClick={() => {
                                  deleteMother({
                                    motherId: mom.Id,
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              )}
            </Box>
          </Stack>
        ) : null}
        {!(father?.showFather.father.length <= 0) ? (
          <Stack
            mt={"2rem"}
            spacing={4}
            w={{ base: "100%", md: "100%" }}
            align={["center", "center", "center", "center", "center"]}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="bold"
              color="blue.400"
              textAlign={["center", "center", "left", "left"]}
            >
              {t("parents.heading-father")}
            </Heading>
            <Box
              w={["100%", "100%", "100%", "80%", "100%"]}
              display={["block", "block", "block", "block"]}
              overflowX={["auto", "auto", "hidden", "hidden"]}
            >
              {fatherFetching && !father ? (
                <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              ) : (
                <Table mt={"2rem"}>
                  <Thead>
                    <Tr>
                      <Th>{t("parents.tbl-name")}</Th>
                      <Th>{t("parents.tbl-surname")}</Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {father!.showFather.father.map((father) =>
                      !father ? null : (
                        <Tr>
                          <Td>{father.Name}</Td>
                          <Td ml={"2rem"}>{father.Surname}</Td>
                          <Td>
                            {role == "Pedagogue" || role == "Headmaster" ? (
                              <NextLink
                                href={"/edit-parents/father/[id]"}
                                as={`/edit-parents/father/${father.Id}`}
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
                            ) : null}
                          </Td>
                          <Td>
                            {role == "Pedagogue" || role == "Headmaster" ? (
                              <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                borderRadius="12px"
                                lineHeight="1"
                                size="md"
                                onClick={() => {
                                  deleteFather({
                                    fatherId: father.Id,
                                  });
                                }}
                              />
                            ) : null}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              )}
            </Box>
          </Stack>
        ) : null}
        {mother &&
        mother.showMother.hasMore &&
        father &&
        father.showFather.hasMore ? (
          <Flex>
            <Button
              onClick={() => {
                setMotherVariables({
                  limit: motherVariables.limit,
                  cursor:
                    mother.showMother.mother[
                      mother.showMother.mother.length - 1
                    ].createdAt,
                });
                setFatherVariables({
                  limit: fatherVariables.limit,
                  cursor:
                    father.showFather.father[
                      father.showFather.father.length - 1
                    ].createdAt,
                });
              }}
              isLoading={motherFetching && fatherFetching}
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
              {t("parents.btn-load-more")}
            </Button>
          </Flex>
        ) : null}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Parents);
