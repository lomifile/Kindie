import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Flex,
  Heading,
  Stack,
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
  Input,
  useDisclosure,
  IconButton,
  Spinner,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  InputLeftElement,
  InputGroup,
  ModalHeader,
} from "@chakra-ui/react";
import { fetchOwnerOf } from "../utils/fetchOwnerOf";
import { fetchStaff } from "../utils/fetchStaff";
import { AddIcon, DeleteIcon, SearchIcon, ViewIcon } from "@chakra-ui/icons";
import {
  useAddStaffMutation,
  useDeleteStaffMutation,
  useMeQuery,
  useSearchUserQuery,
} from "../generated/graphql";
import { ShowUser } from "../components/ShowUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation } from "react-i18next";

const Staff: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const btnRef = React.useRef();
  const owner = fetchOwnerOf();
  const staff = fetchStaff();
  const [, addStaff] = useAddStaffMutation();
  const [, deleteStaff] = useDeleteStaffMutation();
  const [text, setText] = useState("");
  const [show, setShow] = useState(null);
  const [{ data: userSearch, fetching }] = useSearchUserQuery({
    variables: {
      text,
    },
  });
  const [{ data: meData }] = useMeQuery();

  return (
    <Layout variant={"column"} navbarVariant={"user"}>
      <title>{t("staff.main-header")}</title>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("staff.modal.header")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              width={{ base: "90%", md: "400px" }}
              rounded="lg"
              p={5}
              border={"1px"}
              borderColor="blue.400"
              borderRadius={"12px"}
            >
              <Stack spacing={4}>
                <ShowUser
                  title={t("staff.modal.data.name")}
                  data={show?.Name}
                />
                <ShowUser
                  title={t("staff.modal.data.surname")}
                  data={show?.Surname}
                />
                <ShowUser
                  title={t("staff.modal.data.email")}
                  data={show?.Email}
                />
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t("staff.drawer.header")}</DrawerHeader>

            <DrawerBody>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  style={{ borderRadius: "12px" }}
                  placeholder={t("staff.drawer.placeholder")}
                  id="text"
                  onChange={() => {
                    // @ts-ignore
                    setText(document.getElementById("text").value);
                  }}
                />
              </InputGroup>
              <Table mt={5}>
                <Tbody>
                  {!userSearch?.searchUser && fetching ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  ) : (
                    userSearch?.searchUser.map((u) => (
                      <Tr>
                        <Td>{u.Name}</Td>
                        <Td>{u.Surname}</Td>
                        <Td>
                          <IconButton
                            aria-label="Add to staff"
                            icon={<AddIcon />}
                            color="white"
                            bg="blue.400"
                            _hover={{
                              backgroundColor: "#719ABC",
                            }}
                            onClick={() => {
                              addStaff({ Id: u.Id });
                            }}
                          />
                        </Td>
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
                              setShow(u);
                              openModal();
                            }}
                          />
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Stack spacing={8}>
        <Flex
          justify={["center", "center", "center", "left", "left"]}
          mt={5}
          mb={2}
        >
          <Heading color="blue.400">{t("staff.owner-heading")}</Heading>
        </Flex>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>{t("staff.tbl-name")}</Th>
                <Th>{t("staff.tbl-surname")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  {
                    // @ts-ignore
                    owner?.Name
                  }
                </Td>
                <Td>
                  {
                    // @ts-ignore
                    owner?.Surname
                  }
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex
          justify={["center", "center", "center", "left", "left"]}
          mt={20}
          mb={2}
        >
          <Heading color="blue.400">{t("staff.staff-heading")}</Heading>
          {
            // @ts-ignore
            meData?.me?.Name === owner.Name &&
            // @ts-ignore
            meData?.me?.Surname === owner.Surname ? (
              <IconButton
                ml={5}
                bg="blue.400"
                colorScheme="navItem"
                borderRadius="12px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                type="submit"
                onClick={onOpen}
                icon={<AddIcon />}
                aria-label={"Add staff"}
              />
            ) : null
          }
        </Flex>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>{t("staff.tbl-name")}</Th>
                <Th>{t("staff.tbl-surname")}</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {staff?.map((s) => (
                <Tr>
                  <Td>{s.Name}</Td>
                  <Td>{s.Surname}</Td>
                  <Td>
                    {
                      // @ts-ignore
                      meData.me.Name === owner.Name &&
                      // @ts-ignore
                      meData.me.Surname === owner.Surname ? (
                        <IconButton
                          aria-label="Delete from staff"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            deleteStaff({
                              userId: s.Id,
                            });
                          }}
                        />
                      ) : null
                    }
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Staff);
