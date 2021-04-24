import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Flex,
  Box,
  toast,
  Text,
  Stack,
  Button,
  useToast,
  Spinner,
  AlertIcon,
  Alert,
  AlertDescription,
  AlertTitle,
  HStack,
  Heading,
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
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useIsAuth } from "../../utils/useIsAuth";
import { useGetId } from "../../utils/getID";
import {
  useFilterFatherQuery,
  useFilterMotherQuery,
  useFindChildQuery,
  useUpdateChildMutation,
  useUpdateChildrenParentsMutation,
} from "../../generated/graphql";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import children from "../children";
import { ParentCard } from "../../components/ParentCard";

interface EditChildProps {}

const EditChild: React.FC<EditChildProps> = ({}) => {
  useIsAuth();
  const id = useGetId();
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [{ data: mother, fetching: motherFetching }] = useFilterMotherQuery({
    variables: {
      text,
    },
  });
  const [{ data: father, fetching: fatherFetching }] = useFilterFatherQuery({
    variables: {
      text,
    },
  });
  const [{ data, fetching }] = useFindChildQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });

  console.log(data);

  const [, updateChild] = useUpdateChildMutation();
  const [, updateParents] = useUpdateChildrenParentsMutation();

  if (fetching) {
    return (
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          minH="250px"
          minW="250px"
        />
      </Flex>
    );
  } else if (!data?.findChild) {
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
            There was an error
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            An error occured while trying to fetch your data!
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{data.findChild.Name + " " + data.findChild.Surname}</title>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"md"}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add parents to child</DrawerHeader>

            <DrawerBody>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  style={{ borderRadius: "12px" }}
                  placeholder={"Input name or surname..."}
                  id="text"
                  onChange={() => {
                    // @ts-ignore
                    setText(document.getElementById("text").value);
                  }}
                />
              </InputGroup>
              {data.findChild.motherId ? null : (
                <>
                  <Heading mt={5} color="blue.400">
                    Mother
                  </Heading>
                  <Table mt={5}>
                    <Tbody>
                      {!mother && motherFetching ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      ) : null}
                      {mother?.filterMother.map((m) => (
                        <Tr>
                          <Td>{m.Name}</Td>
                          <Td>{m.Surname}</Td>
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
                                updateParents({
                                  childId: data.findChild.Id,
                                  motherId: m.Id,
                                  fatherId: data.findChild.fatherId,
                                });
                              }}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              )}
              {data.findChild.fatherId ? null : (
                <>
                  <Heading mt={5} color="blue.400">
                    Father
                  </Heading>
                  <Table mt={5}>
                    <Tbody>
                      {!father && fatherFetching ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="xl"
                        />
                      ) : null}
                      {father?.filterFather.map((f) => (
                        <Tr>
                          <Td>{f.Name}</Td>
                          <Td>{f.Surname}</Td>
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
                                updateParents({
                                  childId: data.findChild.Id,
                                  motherId: data.findChild.motherId,
                                  fatherId: f.Id,
                                });
                              }}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <HStack spacing={5} mb={10}>
        <Button
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
        >
          Back
        </Button>
        <Heading color="blue.400">Edit child</Heading>
      </HStack>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={5}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: data.findChild.Name,
              surname: data.findChild.Surname,
              gender: data.findChild.Gender,
              birthdate: data.findChild.BirthDate,
              oib: data.findChild.OIB,
              remarks: data.findChild.Remarks,
            }}
            onSubmit={async (values) => {
              const { error } = await updateChild({
                kidId: id,
                options: {
                  Name: values.name,
                  Surname: values.surname,
                  Gender: values.gender,
                  BirthDate: values.birthdate,
                  OIB: values.oib,
                  Remarks: values.remarks,
                },
              });
              if (!error) {
                toast({
                  title: "Child added successfully",
                  description: "We've added your child for you.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.back();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <InputField
                    name="name"
                    placeholder="Name"
                    label="Input name"
                    type="text"
                    required
                  />
                  <InputField
                    name="surname"
                    placeholder="Last name"
                    label="Input last name"
                    type="text"
                    required
                  />
                  <InputField
                    name="gender"
                    placeholder="Gender"
                    label="Input gender"
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder="Birth date"
                    label="Input birth date"
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder="PIN"
                    label="Input PIN"
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder="Remarks"
                    label="Input Remarks"
                    textArea
                    required
                  />
                  <Button
                    bg="blue.400"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Update child
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {!data.findChild.motherId || !data.findChild.fatherId ? (
            <>
              <Button
                leftIcon={<AddIcon />}
                bg="blue.400"
                colorScheme="navItem"
                borderRadius="12px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                onClick={onOpen}
              >
                Add parents
              </Button>
            </>
          ) : (
            <>
              <ParentCard data={data.findChild.mother} />
              <ParentCard data={data.findChild.father} />
            </>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditChild);
