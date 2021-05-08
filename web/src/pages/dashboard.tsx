import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Heading,
  Box,
  Text,
  HStack,
  Spinner,
  Link,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useTranslation } from "react-i18next";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  useCreateKindergardenMutation,
  useDeleteKindergardenMutation,
  useShowKindergardenQuery,
  useUseKindergardenMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { fetchPartOf } from "../utils/fetchPartof";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import { CustomAlert } from "../components/Alerts";
import {CustomSpinner} from '../components/Spinner';
const Dashboard = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  const [, useKindergarden] = useUseKindergardenMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useShowKindergardenQuery();
  const [, createKindergarden] = useCreateKindergardenMutation();
  const [, deleteKindergarden] = useDeleteKindergardenMutation();
  const notMine = fetchPartOf();

  if (fetching && !data?.showKindergarden) {
    return <CustomSpinner />;
  } else if (!data?.showKindergarden && !fetching) {
    return (
      <CustomAlert
        name={t("dashboard.alert.title")}
        data={t("dashboard.alert.desc")}
        status={"error"}
      />
    );
  }
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{t("dashboard.main-header")}</title>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        size={"md"}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("dashboard.modal-header")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "", city: "", address: "", zipcode: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await createKindergarden({
                  options: {
                    name: values.name,
                    city: values.city,
                    address: values.address,
                    Zipcode: parseInt(values.zipcode),
                  },
                });
                if (response.data.createKindergarden.errors) {
                  setErrors(
                    toErrormap(response.data.createKindergarden.errors)
                  );
                } else {
                  toast({
                    title: t("dashboard.toast.title"),
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4} marginBottom="1rem">
                    <InputField
                      name="name"
                      placeholder={t("dashboard.form.placeholder.name")}
                      label={t("dashboard.form.name")}
                      type="text"
                      required
                    />
                    <InputField
                      name="address"
                      placeholder={t("dashboard.form.placeholder.address")}
                      label={t("dashboard.form.address")}
                      type="text"
                      required
                    />
                    <InputField
                      name="city"
                      placeholder={t("dashboard.form.placeholder.city")}
                      label={t("dashboard.form.city")}
                      type="text"
                      required
                    />
                    <InputField
                      name="zipcode"
                      placeholder={t("dashboard.form.placeholder.zip-code")}
                      label={t("dashboard.form.zip-code")}
                      type="text"
                      required
                    />
                  </Stack>
                  <Divider mt={5} mb={5} />
                  <Flex
                    justify={["center", "center", "center", "right", "right"]}
                    pb={2}
                  >
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
                      onClick={onClose}
                    >
                      {t("dashboard.form.btn")}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex mt={["10px", "10px", "10px", "0", "0"]} justify={"center"}>
        <Heading color="blue.400">{t("dashboard.main-header")}</Heading>
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          bg="blue.400"
          colorScheme="navItem"
          borderRadius="12px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          type="submit"
          onClick={onOpen}
          ml={"2rem"}
        />
      </Flex>
      <Divider mt={5} />
      <Stack spacing={10} mt={10}>
        {data?.showKindergarden.length > 0 ? (
          <>
            <Flex justify={["center", "center", "center", "left", "left"]}>
              <Heading ml={["0", "0", "0", "10rem", "10px"]} color="blue.400">
                {t("dashboard.owned-header")}
              </Heading>
            </Flex>
            <Flex align="center" justify="center" mb={5}>
              <Box
                w={["100%", "100%", "100%", "400px", "400px"]}
                rounded={["xs", "sm", "md", "lg", "xl"]}
                p={5}
                border={["0", "0", "0", "1px", "1px"]}
                borderColor={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "blue.400",
                  "blue.400",
                ]}
                borderRadius={"12px"}
                style={{
                  display: "block",
                  width: "1200px",
                  overflowY: "hidden",
                  overflowX: "auto",
                }}
              >
                <HStack spacing={8}>
                  {data?.showKindergarden?.map((owning) => (
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
                      <Flex justify="right">
                        <IconButton
                          aria-label="Delete kindergarden"
                          icon={<CloseIcon />}
                          variant="ghost"
                          onClick={async () => {
                            const { error } = await deleteKindergarden({
                              id: owning.Id,
                            });
                            if (error) {
                              toast({
                                title: t("dashboard.toast.error.title"),
                                description: t("dashboard.toast.error.desc"),
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                              });
                            } else {
                              toast({
                                title: t("dashboard.toast.delete.title"),
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                              });
                            }
                          }}
                        />
                      </Flex>
                      <Box p="6">
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h1"
                          lineHeight="tight"
                        >
                          <NextLink
                            href={"/kindergarden/[id]"}
                            as={`/kindergarden/${owning.Id}`}
                          >
                            <Link
                              color="blue.400"
                              style={{
                                fontSize: "26px",
                                fontWeight: "bold",
                              }}
                              onClick={() => {
                                useKindergarden({ kindergardenID: owning.Id });
                              }}
                            >
                              {owning.Name}
                            </Link>
                          </NextLink>
                        </Box>
                        <Divider />
                        <Box mt={3}>
                          <Text>{owning.Address}</Text>
                          <Text>{owning.City}</Text>
                          <Text>{owning.Zipcode}</Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </>
        ) : null}
      </Stack>
      <Stack Stack spacing={10} mt={10}>
        {notMine.length > 0 ? (
          <>
            <Flex justify={["center", "center", "center", "center", "left"]}>
              <Heading ml={["0", "0", "0", "10rem", "10px"]} color="blue.400">
                {t("dashboard.part-header")}
              </Heading>
            </Flex>
            <Flex align="center" justify="left" mb={5}>
              <Box
                w={["100%", "100%", "100%", "400px", "400px"]}
                rounded={["xs", "sm", "md", "lg", "xl"]}
                p={5}
                border={["0", "0", "0", "1px", "1px"]}
                borderColor={[
                  "transparent",
                  "transparent",
                  "transparent",
                  "blue.400",
                  "blue.400",
                ]}
                borderRadius={"12px"}
                style={{
                  display: "block",
                  width: "1200px",
                  overflowY: "hidden",
                  overflowX: "auto",
                }}
              >
                <HStack spacing={8}>
                  {notMine.map((owning) => (
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
                      <Box p="6">
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h1"
                          lineHeight="tight"
                        >
                          <NextLink
                            href={"/kindergarden/[id]"}
                            as={`/kindergarden/${owning.Id}`}
                          >
                            <Link
                              color="blue.400"
                              style={{
                                fontSize: "26px",
                                fontWeight: "bold",
                              }}
                              onClick={() => {
                                useKindergarden({ kindergardenID: owning.Id });
                              }}
                            >
                              {owning.Name}
                            </Link>
                          </NextLink>
                        </Box>
                        <Divider />
                        <Box mt={3}>
                          <Text>{owning.Address}</Text>
                          <Text>{owning.City}</Text>
                          <Text>{owning.Zipcode}</Text>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </>
        ) : null}
        {/* 
        <Flex mt={5} mb={2}>
          <Heading color="blue.400">Activity log</Heading>
        </Flex>
        <Box
          mb={"5rem"}
          mt={5}
          borderRadius="12px"
          border={"1px"}
          borderColor="blue.400"
          p={5}
          style={{
            display: "block",
            height: "200px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Stack p={2} spacing={4}>
            <Flex borderRadius={"12px"} p={5} shadow="md" borderWidth="1px">
              <Text>Filip Ivanusec added Novo Dijete to Nova grupa</Text>
            </Flex>
            <Flex borderRadius={"12px"} p={5} shadow="md" borderWidth="1px">
              <Text>Filip Ivanusec created Neznam Neznam</Text>
            </Flex>
            <Flex borderRadius={"12px"} p={5} shadow="md" borderWidth="1px">
              <Text>Filip Ivanusec created Novo Dijete</Text>
            </Flex>
          </Stack>
        </Box> */}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);
