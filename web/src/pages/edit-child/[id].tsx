import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Flex,
  Box,
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
import { AddIcon, ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { ParentCard } from "../../components/ParentCard";
import { useTranslation } from "react-i18next";
import { CustomSpinner } from "../../components/Spinner";
import { CustomAlert } from "../../components/Alerts";

const EditChild = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const id = useGetId();
  const toast = useToast();
  const router = useRouter();
  useIsAuth();
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

  const [, updateChild] = useUpdateChildMutation();
  const [, updateParents] = useUpdateChildrenParentsMutation();

  if (fetching) {
    return <CustomSpinner />;
  } else if (!data?.findChild) {
    return (
      <CustomAlert
        name={t("edit-child.alert.title")}
        data={t("edit-child.alert.desc")}
        status={"error"}
      />
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{data.findChild.Name + " " + data.findChild.Surname}</title>
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
              {data.findChild.motherId ? null : (
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
      <Flex justify={["center", "center", "center", "left", "left"]}>
        <HStack spacing={5} mb={10}>
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
          <Heading color="blue.400">{t("edit-child.main-header")}</Heading>
        </HStack>
      </Flex>
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
              oib: data.findChild.OIB.toString(),
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
                  OIB: parseInt(values.oib),
                  Remarks: values.remarks,
                },
              });
              if (!error) {
                toast({
                  title: t("edit-child.toast.title"),
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
                    placeholder={t("edit-child.form.placeholders.name")}
                    label={t("edit-child.form.name")}
                    type="text"
                    required
                  />
                  <InputField
                    name="surname"
                    placeholder={t("edit-child.form.placeholders.surname")}
                    label={t("edit-child.form.surname")}
                    type="text"
                    required
                  />
                  <InputField
                    name="gender"
                    placeholder={t("edit-child.form.placeholders.gender")}
                    label={t("edit-child.form.gender")}
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder={t("edit-child.form.placeholders.birth-date")}
                    label={t("edit-child.form.birth-date")}
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder={t("edit-child.form.placeholders.pin")}
                    label={t("edit-child.form.pin")}
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder={t("edit-child.form.placeholders.remarks")}
                    label={t("edit-child.form.remarks")}
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
                    {t("edit-child.form.btn")}
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
                {t("edit-child.btn-add-parents")}
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

export default withUrqlClient(createUrqlClient)(EditChild);
