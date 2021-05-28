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
  Link,
  Divider,
} from "@chakra-ui/react";
import {
  useAddChildToGroupMutation,
  useClearGroupMutation,
  useDeleteChildrenMutation,
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
  EditIcon,
  DeleteIcon,
  HamburgerIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { getUserRole } from "../../utils/getUserRole";
import { ChildrenModal } from "../../components/ChildrenModal";

const Group = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();
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
  const [, deleteChildren] = useDeleteChildrenMutation();
  const [{ data: children, fetching: fetchingChildren }] = useShowChildrenQuery(
    {
      variables: { text },
    }
  );
  const {
    isOpen: teacherChildViewIsOpen,
    onOpen: teacherChildViewOnOpen,
    onClose: teacherChildViewOnClose,
  } = useDisclosure();
  const [child, setChild] = useState(null);
  const role = getUserRole();
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{groupName}</title>
      {role == "Teacher" ? (
        <ChildrenModal
          onClose={teacherChildViewOnClose}
          isOpen={teacherChildViewIsOpen}
          child={child}
        />
      ) : null}
      {role == "Headmaster" || role == "Pedagouge" ? (
        <>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            size={"md"}
          >
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
          <Drawer isOpen={isOpenMenu} placement="left" onClose={onCloseMenu}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Stack
                    spacing={8}
                    align="center"
                    justify={["center", "space-between"]}
                    direction={["column", "column", "column"]}
                    pt={[4, 4, 0, 0]}
                  >
                    <Button
                      as={Link}
                      color="blue.400"
                      colorScheme="navItem"
                      borderRadius="12px"
                      py="4"
                      px="4"
                      lineHeight="1"
                      size="md"
                      onClick={() => {
                        onCloseMenu();
                        onOpen();
                      }}
                    >
                      {t("group.btn-add")}
                    </Button>
                    <NextLink
                      href={"/kindergarden/[id]"}
                      as={`/kindergarden/${
                        typeof router.query.id === "string"
                          ? router.query.id
                          : ""
                      }`}
                    >
                      <Button
                        as={Link}
                        color="blue.400"
                        colorScheme="navItem"
                        borderRadius="12px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="md"
                        onClick={() => {
                          clearGroup();
                        }}
                      >
                        {t("group.btn-return")}
                      </Button>
                    </NextLink>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : null}
      <Stack spacing={5}>
        <Flex align="center" justify="center" mt={5} p={3}>
          <HStack p={2} spacing={4}>
            {role == "Pedagogue" || role == "Headmaster" ? (
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
                display={["none", "none", "none", "flex"]}
              >
                {t("group.btn-add")}
              </Button>
            ) : null}
            <Button
              bg="blue.400"
              className="nav-item"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              display={["none", "none", "none", "flex"]}
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
            <IconButton
              display={["flex", "flex", "flex", "none"]}
              colorScheme="navItem"
              color="white"
              bg="blue.400"
              borderRadius={"12px"}
              className="menu-btn"
              aria-label="Open menu"
              onClick={onOpenMenu}
              icon={<HamburgerIcon />}
            />
          </HStack>
        </Flex>
      </Stack>
      <Divider mt={5} />
      <Box
        w={["100%", "100%", "100%", "100%", "100%"]}
        display={["block", "block", "block", "block"]}
        overflowX={["auto", "auto", "hidden", "hidden"]}
      >
        {fetching && !data ? (
          <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Table mt={"2rem"}>
            {data!.showChildrenFilterInGroup.children.length > 0 ? (
              <Thead>
                <Tr>
                  <Th>{t("group.tbl-name")}</Th>
                  <Th>{t("group.tbl-surname")}</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
            ) : null}
            <Tbody>
              {data!.showChildrenFilterInGroup.children.map((child) =>
                !child ? null : (
                  <Tr>
                    <Td>{child.Name}</Td>
                    <Td ml={"2rem"}>{child.Surname}</Td>
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
                            teacherChildViewOnOpen();
                          }}
                        />
                      </Td>
                    ) : null}
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
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Group);
