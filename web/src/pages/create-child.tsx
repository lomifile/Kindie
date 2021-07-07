import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Stack,
  Flex,
  Button,
  useToast,
  Box,
  Heading,
  HStack,
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
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import {
  useCreateChildMutation,
  useFilterFatherQuery,
  useFilterMotherQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation } from "react-i18next";
import { SearchIcon, AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { ParentCard } from "../components/ParentCard";
import moment from "moment";

interface CreateChildProps {}

const CreateChild: React.FC<CreateChildProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  const router = useRouter();
  const [, createChild] = useCreateChildMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [text, setText] = useState("");
  const [motherId, setMotherId] = useState(null);
  const [fatherId, setFatherId] = useState(null);

  const [motherObject, setMotherObjcet] = useState(null);
  const [fatherObject, setFatherObject] = useState(null);

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

  return (
    <Layout variant="column" navbarVariant="user">
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"md"}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{t("edit-child.drawer.header")}</DrawerHeader>
            <DrawerBody>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  style={{ borderRadius: "12px" }}
                  placeholder={t("edit-child.drawer.placeholder")}
                  id="text"
                  onChange={() => {
                    // @ts-ignore
                    setText(document.getElementById("text").value);
                  }}
                />
              </InputGroup>
              {motherId ? null : (
                <>
                  <Heading mt={5} color="blue.400">
                    {t("edit-child.drawer.tbl-mother")}
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
                                setMotherObjcet(m);
                                setMotherId(m.Id);
                              }}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              )}
              {fatherId ? null : (
                <>
                  <Heading mt={5} color="blue.400">
                    {t("edit-child.drawer.tbl-father")}
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
                                setFatherObject(f);
                                setFatherId(f.Id);
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
      <title>{t("create-child.main-header")}</title>
      <HStack mb={5} spacing={5}>
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
        />
        <Heading color="blue.400">{t("create-child.main-header")}</Heading>
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
              name: "",
              surname: "",
              gender: "",
              birthdate: "",
              oib: "",
              remarks: "",
            }}
            onSubmit={async (values) => {
              const { error } = await createChild({
                options: {
                  Name: values.name,
                  Surname: values.surname,
                  Gender: values.gender,
                  BirthDate: moment(new Date(values.birthdate)).format(
                    "MM-DD-YYYY"
                  ),
                  OIB: parseInt(values.oib),
                  Remarks: values.remarks,
                  mother: motherId,
                  father: fatherId,
                },
              });
              console.log(
                moment(new Date(values.birthdate)).format("DD/MM/YYYY")
              );
              if (!error) {
                toast({
                  title: t("create-child.toast.title"),
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
                    placeholder={t("create-child.form.placeholders.name")}
                    label={t("create-child.form.name")}
                    type="text"
                    required
                  />
                  <InputField
                    name="surname"
                    placeholder={t("create-child.form.placeholders.surname")}
                    label={t("create-child.form.surname")}
                    type="text"
                    required
                  />
                  <InputField
                    name="gender"
                    placeholder={t("create-child.form.placeholders.gender")}
                    label={t("create-child.form.gender")}
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder={t("create-child.form.placeholders.birth-date")}
                    label={t("create-child.form.birth-date")}
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder={t("create-child.form.placeholders.pin")}
                    label={t("create-child.form.pin")}
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder={t("create-child.form.placeholders.remarks")}
                    label={t("create-child.form.remarks")}
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
                    {t("create-child.form.btn")}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {!motherId || !fatherId ? (
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
                {t("edit-child.btn-add-parents")}
              </Button>
            </>
          ) : (
            <>
              <ParentCard data={motherObject} />
              <ParentCard data={fatherObject} />
            </>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateChild);
