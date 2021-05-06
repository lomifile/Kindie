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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
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
  Spinner,
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
  } else if (!fetching && !data?.showGroups) {
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
            {t("kindergarden.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("kindergarden.alert.desc")}
          </AlertDescription>
        </Alert>
      </Flex>
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
                    drawerOnClose();
                    onOpen();
                  }}
                >
                  {t("kindergarden.toolbox.btn-new-group")}
                </Button>
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
                  <Flex justify="right">
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
        <Flex
          align="center"
          justify="center"
          mb={"2rem"}
          mt={5}
          borderRadius="12px"
          border={["0", "0", "0", "1px", "1px"]}
          borderColor={[
            "transparent",
            "transparent",
            "transparent",
            "blue.400",
            "blue.400",
          ]}
          p={5}
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
              display={["none", "none", "none", "flex"]}
            >
              {t("kindergarden.toolbox.btn-new-group")}
            </Button>
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
            <Flex mt={5}>
              <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
                {t("kindergarden.groups-heading")}
              </Heading>
            </Flex>
            <Flex align="center" justify="left" mb={5} mt={5}>
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
                  {data?.showGroups?.map((owning) => (
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
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
                                description: t("kindergarden.toast.error.desc"),
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
