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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  color,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCreateKindergardenMutation,
  useDeleteKindergardenMutation,
  useShowKindergardenQuery,
  useUseKindergardenMutation,
} from "../generated/graphql";
import { bgColor } from "../utils/colorModeColors";
import { createUrqlClient } from "../utils/createUrqlClient";
import { fetchPartOf } from "../utils/fetchPartof";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  useIsAuth();
  const router = useRouter();
  const toast = useToast();
  const [, useKindergarden] = useUseKindergardenMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useShowKindergardenQuery();
  const [, createKindergarden] = useCreateKindergardenMutation();
  const [, deleteKindergarden] = useDeleteKindergardenMutation();
  const notMine = fetchPartOf();

  const { colorMode } = useColorMode();
  const bg = useColorModeValue(bgColor.light, bgColor.dark);
  const headerColor = useColorModeValue("blue.400", "brand.100");
  const textColor = useColorModeValue("primary.800", "brand.200");
  const btnColor = useColorModeValue("blue.400", "transparent");
  const btnBorderColor = useColorModeValue("none", "brand.200");
  const btnTextColor = useColorModeValue("white", "brand.200");
  const featureBorderColor = useColorModeValue("black", "brand.200");
  const borderColor = useColorModeValue("gray.200", "brand.200");
  const boxBorderColor = useColorModeValue("blue.400", "brand.200");

  if (fetching && !data?.showKindergarden) {
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
  } else if (!data?.showKindergarden && !fetching) {
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
            {t("dashboard.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("dashboard.alert.desc")}
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }
  return (
    <Layout
      // @ts-ignore
      bg={bg}
      navbarVariant={"user"}
      variant={"column"}
    >
      <title>{t("dashboard.main-header")}</title>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={bg} color={headerColor}>
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
                  <Flex justify="right">
                    <Button
                      variant={colorMode === "dark" ? "outline" : "solid"}
                      borderColor={btnBorderColor}
                      bg={btnColor}
                      color={btnTextColor}
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
      <Flex bg={bg}>
        <Heading ml={["25px", "25px", "0", "0", "0"]} color={headerColor}>
          {t("dashboard.main-header")}
        </Heading>
        <IconButton
          aria-label="Add"
          icon={<AddIcon />}
          variant={colorMode === "dark" ? "outline" : "solid"}
          borderColor={btnBorderColor}
          bg={btnColor}
          color={btnTextColor}
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
      <Divider
        mt={5}
        borderColor={borderColor}
        maxW={["100%", "100%", "100%", "80%", "80%"]}
      />
      <Stack spacing={10} mt={10}>
        {data?.showKindergarden.length > 0 ? (
          <>
            <Heading ml="10px" color={headerColor}>
              {t("dashboard.owned-header")}
            </Heading>
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
                  boxBorderColor,
                  boxBorderColor,
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
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      borderColor={boxBorderColor}
                    >
                      <Flex justify="right">
                        <IconButton
                          color={headerColor}
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
                          <Link
                            color={headerColor}
                            style={{
                              fontSize: "26px",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              useKindergarden({ kindergardenID: owning.Id });
                              router.push(`/kindergarden/${owning.Id}`);
                            }}
                          >
                            {owning.Name}
                          </Link>
                        </Box>
                        <Divider />
                        <Box mt={3} color={textColor}>
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
        {notMine.length > 0 ? (
          <>
            <Heading ml="10px" color={headerColor}>
              {t("dashboard.part-header")}
            </Heading>
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
                  boxBorderColor,
                  boxBorderColor,
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
                          <Link
                            color={headerColor}
                            style={{
                              fontSize: "26px",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              useKindergarden({ kindergardenID: owning.Id });
                              router.push(`/kindergarden/${owning.Id}`);
                            }}
                          >
                            {owning.Name}
                          </Link>
                        </Box>
                        <Divider borderColor={borderColor} />
                        <Box mt={3} color={textColor}>
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);
