import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import {
  Stack,
  Flex,
  HStack,
  Button,
  Box,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import {
  useAddChildToGroupMutation,
  useClearGroupMutation,
  useShowChildrenFilterInGroupQuery,
  useShowChildrenQuery,
} from "../../generated/graphql";
import { fetchGroup } from "../../utils/fetchGroup";
import { useIsAuth } from "../../utils/useIsAuth";
import NextLink from "next/link";
import {
  SearchIcon,
  AddIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

interface GroupProps {}

const Group: React.FC<GroupProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [text, setText] = useState("");
  const router = useRouter();
  const [, clearGroup] = useClearGroupMutation();
  const groupName = fetchGroup();
  const [, addChildToGroup] = useAddChildToGroupMutation();
  const [{ data, fetching }] = useShowChildrenFilterInGroupQuery({
    variables,
  });

  const [{ data: children, fetching: fetchingChildren }] = useShowChildrenQuery(
    {
      variables: { text },
    }
  );
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{groupName}</title>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"md"}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t("group.drawer.header")}</DrawerHeader>
            <DrawerBody>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  style={{ borderRadius: "12px" }}
                  placeholder={t("group.drawer.placeholder")}
                  id="text"
                  onChange={() => {
                    // @ts-ignore
                    setText(document.getElementById("text").value);
                  }}
                />
              </InputGroup>
              <Table mt={5}>
                <Tbody>
                  {!children && fetchingChildren ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  ) : null}
                  {children?.showChildren.map((c) => (
                    <Tr>
                      <Td>{c.Name}</Td>
                      <Td>{c.Surname}</Td>
                      <Td>
                        <IconButton
                          aria-label="Add to group"
                          icon={<AddIcon />}
                          color="white"
                          bg="blue.400"
                          _hover={{
                            backgroundColor: "#719ABC",
                          }}
                          onClick={() => {
                            addChildToGroup({
                              id: c.Id,
                            });
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
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
            <Button
              bg="blue.400"
              className="nav-item"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              onClick={onOpen}
            >
              {t("group.btn-add")}
            </Button>
            <Button
              bg="blue.400"
              className="nav-item"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              onClick={async () => {
                await clearGroup();
                router.push(
                  `/kindergarden/${
                    typeof router.query.id === "string" ? router.query.id : ""
                  }`
                );
              }}
            >
              {t("group.btn-return")}
            </Button>
          </HStack>
        </Flex>
        {fetching && !data ? (
          <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Table m={10}>
            <Thead>
              <Tr>
                <Th>{t("group.tbl-name")}</Th>
                <Th>{t("group.tbl-surname")}</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data!.showChildrenFilterInGroup.children.map((child) =>
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
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Group);
