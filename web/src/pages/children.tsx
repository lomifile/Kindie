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
  IconButton,
  useDisclosure,
  Divider,
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
  ViewIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { CustomAlert } from "../components/Alerts";
import { getUserRole } from "../utils/getUserRole";
import { ChildrenModal } from "../components/ChildrenModal";
import isElectron from "is-electron";
import router from "next/router";

const Children: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useShowChildrenNotIngroupQuery({
    variables,
  });

  const role = getUserRole();

  const [, deleteChildren] = useDeleteChildrenMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [child, setChild] = useState(null);

  if (!fetching && !data) {
    return (
      <CustomAlert
        status={"error"}
        name={t("children.alert.title")}
        data={t("children.alert.desc")}
      />
    );
  }

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("children.main-header")}</title>
      {role == "Teacher" ? (
        <ChildrenModal onClose={onClose} isOpen={isOpen} child={child} />
      ) : null}
      <Flex justify={["center", "center", "center", "center", "center"]}>
        <HStack spacing={5}>
          {isElectron() ? (
            <IconButton
              bg="blue.400"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              type="submit"
              onClick={() => {
                router.back();
              }}
              aria-label={"Back"}
              icon={<ArrowBackIcon />}
              mr={2}
            />
          ) : null}
          <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
            {t("children.main-header")}
          </Heading>
          {role == "Headmaster" || role == "Pedagogue" ? (
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
          ) : null}
        </HStack>
      </Flex>
      <Divider mt={5} />
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
              {data!.showChildrenFilterNotInGroup.children.length > 0 ? (
                <Thead>
                  <Tr>
                    <Th>{t("children.tbl-name")}</Th>
                    <Th>{t("children.tbl-surname")}</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
              ) : null}
              <Tbody>
                {data!.showChildrenFilterNotInGroup.children.map((child) =>
                  !child ? null : (
                    <Tr>
                      <Td>{child.Name}</Td>
                      <Td ml={"2rem"}>{child.Surname}</Td>
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
                              setChild(child);
                              onOpen();
                            }}
                          />
                        </Td>
                      ) : null}
                      <Td>
                        {role == "Pedagogue" || role == "Headmaster" ? (
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
                              deleteChildren({
                                id: child.Id,
                              });
                            }}
                          />
                        ) : null}
                      </Td>
                      {role == "Pedagogue" || role == "Headmaster" ? (
                        <Td>
                          {!child.fatherId || !child.motherId ? (
                            <Tooltip label={t("children.tooltip.warning")}>
                              <WarningIcon color={"yellow.400"} />
                            </Tooltip>
                          ) : (
                            <Tooltip label={t("children.tooltip.success")}>
                              <CheckCircleIcon color={"green.400"} />
                            </Tooltip>
                          )}
                        </Td>
                      ) : null}
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
