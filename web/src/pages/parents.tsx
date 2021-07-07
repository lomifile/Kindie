import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Divider,
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
  useDisclosure,
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
import { EditIcon, DeleteIcon, AddIcon, ViewIcon } from "@chakra-ui/icons";
import { getUserRole } from "../utils/getUserRole";
import { ParentsModal } from "../components/ParentsModal";

const Parents: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const role = getUserRole();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parent, setParent] = useState(null);

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
      <ParentsModal data={parent} isOpen={isOpen} onClose={onClose} />
      <Stack spacing={1}>
        <Flex align="center" justify="center" mt={5} p={3}>
          <HStack p={2} spacing={4}>
            <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
              {t("parents.main-header")}
            </Heading>
            {role == "Headmaster" || role == "Pedagogue" ? (
              <NextLink href="/create-parents">
                <IconButton
                  aria-label="Add parents"
                  icon={<AddIcon />}
                  bg="blue.400"
                  className="nav-item"
                  colorScheme="navItem"
                  borderRadius="12px"
                  py="4"
                  px="4"
                  lineHeight="1"
                  size="md"
                />
              </NextLink>
            ) : null}
          </HStack>
        </Flex>
      </Stack>
      <Divider mt={5} />
      <Flex
        align="center"
        justify={{ base: "center", md: "center", xl: "space-between" }}
        direction={{ base: "column", md: "column" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="20vh"
        mt={10}
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
                          {role == "Teacher" ? (
                            <Td>
                              <IconButton
                                aria-label="View user"
                                icon={<ViewIcon />}
                                color="white"
                                bg="blue.400"
                                _hover={{
                                  backgroundColor: "#719ABC",
                                }}
                                onClick={() => {
                                  setParent(mom);
                                  onOpen();
                                }}
                              />
                            </Td>
                          ) : null}
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
                          {role == "Teacher" ? (
                            <Td>
                              <IconButton
                                aria-label="View user"
                                icon={<ViewIcon />}
                                color="white"
                                bg="blue.400"
                                _hover={{
                                  backgroundColor: "#719ABC",
                                }}
                                onClick={() => {
                                  setParent(father);
                                  onOpen();
                                }}
                              />
                            </Td>
                          ) : null}
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
