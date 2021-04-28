import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import {
  Stack,
  Flex,
  Button,
  Heading,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import {
  useFindFatherQuery,
  useFindMotherQuery,
  useUpdateFatherMutation,
  useUpdateMotherMutation,
} from "../../generated/graphql";
import { useGetId } from "../../utils/getID";

interface EditParentsProps {}

const EditParents: React.FC<EditParentsProps> = ({}) => {
  const router = useRouter();
  const id = useGetId();
  const toast = useToast();
  const parent = typeof router.query.parent ? router.query.parent : "";
  let body;

  if (parent === "mother") {
    motherData(id, body, router, toast);
  } else if (parent === "father") {
    fatherData(id, body, router, toast);
  }
  return (
    <Layout variant="column" navbarVariant="user">
      {body}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditParents);

function motherData(id, body, router, toast) {
  const [{ data: mother, fetching: fetchMother }] = useFindMotherQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });
  const [, updateMother] = useUpdateMotherMutation();
  if (fetchMother && !mother) {
    body = (
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
  }
  body = (
    <>
      <title>Edit mother</title>
      <Stack spacing={8}>
        <Flex mt={5} mb={2}>
          <Button
            bg="blue.400"
            className="nav-item"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            mr={5}
            mt={1}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Heading color="blue.400">Edit mother</Heading>
        </Flex>
      </Stack>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: mother.findMother.Name,
              surname: mother.findMother.Surname,
              email: mother.findMother.Email,
              phone: mother.findMother.Phone,
            }}
            onSubmit={async (values) => {
              const { error } = await updateMother({
                motherId: mother.findMother.Id,
                options: {
                  ...values,
                },
              });
              if (!error) {
                toast({
                  title: "Mother updated successfully",
                  description: "We've updated your data for you.",
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
                    name="email"
                    placeholder="Email"
                    label="Input Email"
                    type="email"
                    required
                  />
                  <InputField
                    name="phone"
                    placeholder="Phone"
                    label="Input Phone"
                    type="text"
                    required
                  />
                  <Button
                    isDisabled={!parent}
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
                    Update {!parent ? "" : parent}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
}

function fatherData(id, body, router, toast) {
  const [{ data: father, fetching: fetchFather }] = useFindFatherQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });
  const [, updateFather] = useUpdateFatherMutation();
  body = (
    <>
      <title>Edit father</title>
      <Stack spacing={8}>
        <Flex mt={5} mb={2}>
          <Button
            bg="blue.400"
            className="nav-item"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            mr={5}
            mt={1}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Heading color="blue.400">Edit father</Heading>
        </Flex>
      </Stack>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: father.findFather.Name,
              surname: father.findFather.Surname,
              email: father.findFather.Email,
              phone: father.findFather.Phone,
            }}
            onSubmit={async (values) => {
              const { error } = await updateFather({
                fatherId: father.findFather.Id,
                options: {
                  ...values,
                },
              });
              if (!error) {
                toast({
                  title: "Father updated successfully",
                  description: "We've updated your data for you.",
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
                    name="email"
                    placeholder="Email"
                    label="Input Email"
                    type="email"
                    required
                  />
                  <InputField
                    name="phone"
                    placeholder="Phone"
                    label="Input Phone"
                    type="text"
                    required
                  />
                  <Button
                    isDisabled={!parent}
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
                    Update {!parent ? "" : parent}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </>
  );
}
