import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Text,
  Button,
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

interface StaffProps {}

const Staff: React.FC<StaffProps> = ({}) => {
  useIsAuth();
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
  const [{ data: meData, fetching: meFetching }] = useMeQuery();

  return (
    <Layout variant={"column"} navbarVariant={"user"}>
      <title>Staff</title>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Show user</ModalHeader>
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
                <ShowUser title="Name" data={show?.Name} />
                <ShowUser title="Last name" data={show?.Surname} />
                <ShowUser title="Email" data={show?.Email} />
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
            <DrawerHeader>Add staff</DrawerHeader>

            <DrawerBody>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  style={{ borderRadius: "12px" }}
                  placeholder={"Input name..."}
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
        <Flex mt={5} mb={2}>
          <Heading color="blue.400">Owner</Heading>
        </Flex>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Last name</Th>
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
        <Flex mt={20} mb={2}>
          <Heading color="blue.400">Staff</Heading>
          {
            // @ts-ignore
            meData.me.Name === owner.Name &&
            // @ts-ignore
            meData.me.Surname === owner.Surname ? (
              <Button
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
              >
                <AddIcon mr={2} />
                <Text mt={0.5}>Add staff</Text>
              </Button>
            ) : null
          }
        </Flex>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Last name</Th>
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
