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
import { useRouter } from "next/router";
import { useIsAuth } from "../../utils/useIsAuth";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { toErrormap } from "../../utils/toErrorMap";
import { isServer } from "../../utils/isServer";
import { CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

interface KindergardenProps {}

const Kindergarden: React.FC<KindergardenProps> = ({}) => {
  useIsAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useShowGroupsQuery({
    pause: isServer(),
  });
  const [, createGroup] = useCreateGroupMutation();
  const [, useGroup] = useUseGroupMutation();
  const [, useChildren] = useUseChildrenMutation();
  const [, deleteGroup] = useDeleteGroupMutation();
  const router = useRouter();

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
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>Kindergarden</title>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create group</ModalHeader>
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
                    title: "Group created successfully",
                    description: "We've created your group for you.",
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
                      placeholder="Name"
                      label="Input name"
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
                      Create group
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack spacing={8}>
        <Flex mt={5} mb={2}>
          <Heading color="blue.400">Toolbox</Heading>
        </Flex>
        <Flex
          align="center"
          justify="center"
          mb={"2rem"}
          mt={5}
          borderRadius="12px"
          border={"1px"}
          borderColor="blue.400"
          p={3}
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
            >
              New group
            </Button>
            <Button
              bg="blue.400"
              className="nav-item"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              onClick={async () => {
                await useChildren();
                router.push("/children");
              }}
            >
              Children
            </Button>
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
              >
                Parents
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
              >
                Staff
              </Button>
            </NextLink>
          </HStack>
        </Flex>
        <Flex mt={5} mb={2}>
          <Heading color="blue.400">My groups</Heading>
        </Flex>
        <Flex align="center" justify="left" mb={5} mt={5}>
          <Box
            mt={5}
            borderRadius="12px"
            border={"1px"}
            borderColor="blue.400"
            p={5}
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
                            title: "You cannot delete this group",
                            description: "This Group contains data!",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          });
                        } else {
                          toast({
                            title: "Group deleted successfully",
                            description: "We've deleted your group for you.",
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
                        color="blue.400"
                        style={{
                          fontSize: "26px",
                          fontWeight: "bold",
                        }}
                        onClick={async () => {
                          await useGroup({ groupId: owning.Id });
                          router.push(
                            `/group/${
                              typeof router.query.id === "string"
                                ? router.query.id
                                : ""
                            }?name=${owning.Name}`
                          );
                        }}
                      >
                        {owning.Name}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              ))}
            </HStack>
          </Box>
        </Flex>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kindergarden);
