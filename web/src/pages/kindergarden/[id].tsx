import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useShowGroupsQuery,
  useUseChildrenMutation,
  useUseGroupMutation,
} from "../../generated/graphql";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { toErrormap } from "../../utils/toErrorMap";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { useIsAuth } from "../../utils/useIsAuth";
import { CustomSpinner } from "../../components/Spinner";
import { CustomAlert } from "../../components/Alerts";
import { getUserRole } from "../../utils/getUserRole";

const Kindergarden = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [{ data, fetching }] = useShowGroupsQuery();
  const [, createGroup] = useCreateGroupMutation();
  const [, useGroup] = useUseGroupMutation();
  const [, useChildren] = useUseChildrenMutation();
  const [, deleteGroup] = useDeleteGroupMutation();
  const role = getUserRole();

  if (fetching) {
    return <CustomSpinner />;
  } else if (!fetching && !data?.showGroups) {
    return (
      <CustomAlert
        status={"error"}
        name={t("kindergarden.alert.title")}
        data={t("kindergarden.alert.desc")}
      />
    );
  }
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{t("kindergarden.main-header")}</title>
      <Drawer placement="left" onClose={drawerOnClose} isOpen={drawerIsOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading
                fontSize="xl"
                fontWeight="500"
                color="blue.400"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                DV Organizator
              </Heading>
            </DrawerHeader>
            <DrawerBody>
              <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between"]}
                direction={["column", "column", "column"]}
                pt={[4, 4, 0, 0]}
              >
                {role === "Headmaster" || role === "Pedagogue" ? (
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
                    {t("kindergarden.toolbox.btn-new-group")}
                  </Button>
                ) : null}
                <NextLink href="/children">
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
                      useChildren();
                    }}
                  >
                    {t("kindergarden.toolbox.btn-children")}
                  </Button>
                </NextLink>
                <NextLink href="/parents">
                  <Button
                    as={Link}
                    color="blue.400"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                  >
                    {t("kindergarden.toolbox.btn-parents")}
                  </Button>
                </NextLink>
                <NextLink href="/staff">
                  <Button
                    as={Link}
                    color="blue.400"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    lineHeight="1"
                    size="md"
                  >
                    {t("kindergarden.toolbox.btn-staff")}
                  </Button>
                </NextLink>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Modal
        onClose={onClose}
        size={"md"}
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("kindergarden.modal.header")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await createGroup({
                  name: values.name,
                });
                if (response.data.createGroup.errors) {
                  setErrors(toErrormap(response.data.createGroup.errors));
                } else {
                  toast({
                    title: t("kindergarden.toast.create.title"),
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
                      placeholder={t("kindergarden.form.placeholders.name")}
                      label={t("kindergarden.form.name")}
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
                      {t("kindergarden.form.btn")}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack spacing={8}>
        <Flex align="center" justify="center" mt={5} p={5}>
          <HStack p={1} spacing={4}>
            {role === "Headmaster" || role === "Pedagogue" ? (
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
                {t("kindergarden.toolbox.btn-new-group")}
              </Button>
            ) : null}
            <NextLink href={"/children"}>
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
                  await useChildren();
                }}
              >
                {t("kindergarden.toolbox.btn-children")}
              </Button>
            </NextLink>
            <NextLink href="/parents">
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
              >
                {t("kindergarden.toolbox.btn-parents")}
              </Button>
            </NextLink>
            <NextLink href="/staff">
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
              >
                {t("kindergarden.toolbox.btn-staff")}
              </Button>
            </NextLink>
            <IconButton
              display={["flex", "flex", "flex", "none"]}
              colorScheme="navItem"
              color="white"
              bg="blue.400"
              borderRadius={"12px"}
              className="menu-btn"
              aria-label="Open menu"
              onClick={drawerOnOpen}
              icon={<HamburgerIcon />}
            />
          </HStack>
        </Flex>
        {data?.showGroups.length > 0 ? (
          <>
            <Flex justify={["center", "center", "center", "center", "left"]}>
              <Heading ml={["0", "0", "0", "10px", "10px"]} color="blue.400">
                {t("kindergarden.groups-heading")}
              </Heading>
            </Flex>
            <Flex align="center" justify="center" mb={5} mt={5}>
              <Box
                w={["100%", "100%", "100%", "400px", "400px"]}
                rounded={["xs", "sm", "md", "lg", "xl"]}
                p={5}
                style={{
                  display: "block",
                  width: "1200px",
                  overflowY: "hidden",
                  overflowX: "auto",
                }}
              >
                <HStack spacing={8} padding={5}>
                  {data?.showGroups?.map((owning) => (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      shadow="xl"
                      key={owning.Id}
                    >
                      {role == "Headmaster" ? (
                        <Flex justify="right">
                          <IconButton
                            aria-label="Delete group"
                            icon={<CloseIcon />}
                            variant="ghost"
                            onClick={async () => {
                              const { error } = await deleteGroup({
                                id: owning.Id,
                              });
                              if (error) {
                                toast({
                                  title: t("kindergarden.toast.error.title"),
                                  description: t(
                                    "kindergarden.toast.error.desc"
                                  ),
                                  status: "error",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              } else {
                                toast({
                                  title: t("kindergarden.toast.delete"),
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }
                            }}
                          />
                        </Flex>
                      ) : null}
                      <Box p="6">
                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h1"
                          lineHeight="tight"
                        >
                          <NextLink
                            href={"/group/[id]"}
                            as={`/group/${owning.Id}?name=${owning.Name}`}
                          >
                            <Link
                              color="blue.400"
                              style={{
                                fontSize: "26px",
                                fontWeight: "bold",
                              }}
                              onClick={() => {
                                useGroup({ groupId: owning.Id });
                              }}
                            >
                              {owning.Name}
                            </Link>
                          </NextLink>
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Kindergarden);
