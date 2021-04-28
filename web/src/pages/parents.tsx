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
import { useShowfatherQuery, useShowMotherQuery } from "../generated/graphql";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface ParentsProps {}

const Parents: React.FC<ParentsProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const router = useRouter();
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

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("parents.main-header")}</title>
      <Stack spacing={8}>
        <Flex
          align="center"
          justify="center"
          mb={"2rem"}
          mt={5}
          borderRadius="12px"
          border={"1px"}
          borderColor="blue.400"
          p={3}
        >
          <HStack p={2} spacing={4}>
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
          </HStack>
        </Flex>
      </Stack>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="20vh"
        px={8}
        mb={5}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
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
          <Box>
            {motherFetching && !mother ? (
              <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            ) : (
              <Table m={10}>
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
                          <NextLink
                            href={"/edit-parents/[id]"}
                            as={`/edit-parents/${mom.Id}?parent=mother`}
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
                            onClick={() => {}}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            )}
          </Box>
        </Stack>
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
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
          <Box>
            {fatherFetching && !father ? (
              <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            ) : (
              <Table m={10}>
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
                          {/* <NextLink
                            href={"/edit-parents/[id]"}
                            as={`/edit-parents/${father.Id}?parent=father`}
                          > */}
                          <Button
                            bg="blue.400"
                            colorScheme="navItem"
                            borderRadius="12px"
                            py="4"
                            px="4"
                            lineHeight="1"
                            size="md"
                            ml={"2rem"}
                            onClick={async () => {
                              await router.push(
                                `/edit-parents/${father.Id}?parent=father`
                              );
                            }}
                          >
                            Edit
                          </Button>
                          {/* </NextLink> */}
                        </Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            borderRadius="12px"
                            lineHeight="1"
                            size="md"
                            onClick={() => {}}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            )}
          </Box>
        </Stack>
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
