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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCreateKindergardenMutation,
  useDeleteKindergardenMutation,
  useShowKindergardenQuery,
  useUseKindergardenMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { fetchPartOf } from "../utils/fetchPartof";
import { isServer } from "../utils/isServer";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const toast = useToast();
  const [, useKindergarden] = useUseKindergardenMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useShowKindergardenQuery();
  const [, createKindergarden] = useCreateKindergardenMutation();
  const [, deleteKindergarden] = useDeleteKindergardenMutation();
  const notMine = fetchPartOf();

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
      <title>Dashboard</title>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create kindergarden</ModalHeader>
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
                    title: "Kindergarden created successfully",
                    description: "We've created your kindergarden for you.",
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
                    <InputField
                      name="address"
                      placeholder="Address"
                      label="Input address"
                      type="text"
                      required
                    />
                    <InputField
                      name="city"
                      placeholder="City"
                      label="Input City"
                      type="text"
                      required
                    />
                    <InputField
                      name="zipcode"
                      placeholder="Zip code"
                      label="Input Zip code"
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
                      Create kindergarden
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex>
        <Heading color="blue.400">Dashboard</Heading>
        <Button
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
        >
          <AddIcon mr={2} />
          <Text mt={0.5}>Create kindergarden</Text>
        </Button>
      </Flex>
      <Divider mt={5} />
      <Stack spacing={10} mt={10}>
        {data?.showKindergarden.length > 0 ? (
          <>
            <Heading color="blue.400">Owned by you</Heading>
            <Flex align="center" justify="left" mb={5}>
              <Box
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
                                title: "You cannot delete this kindergarden",
                                description: "This Kindergarden contains data!",
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                              });
                            } else {
                              toast({
                                title: "Kindergarden deleted successfully",
                                description:
                                  "We've deleted your kindergarden for you.",
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
                              useKindergarden({ kindergardenID: owning.Id });
                              router.push(`/kindergarden/${owning.Id}`);
                            }}
                          >
                            {owning.Name}
                          </Link>
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
        {notMine.length > 0 ? (
          <>
            <Heading color="blue.400">Part of</Heading>
            <Flex align="center" justify="left" mb={5}>
              <Box
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
                            color="blue.400"
                            style={{
                              fontSize: "26px",
                              fontWeight: "bold",
                            }}
                            onClick={async () => {
                              useKindergarden({ kindergardenID: owning.Id });
                              router.push(`/kindergarden/${owning.Id}`);
                            }}
                          >
                            {owning.Name}
                          </Link>
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
