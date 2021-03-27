import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import {
  useAddFatherMutation,
  useAddMotherMutation,
} from "../generated/graphql";

interface CreateParentsProps {}

const CreateParents: React.FC<CreateParentsProps> = ({}) => {
  const [, addMother] = useAddMotherMutation();
  const [, addFather] = useAddFatherMutation();
  const toast = useToast();
  const [parent, setParent] = useState(null);
  const router = useRouter();
  return (
    <Layout variant="column" navbarVariant="user">
      <title>Create parents</title>
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
          <Heading color="blue.400">Create parents</Heading>
          <Select
            ml={5}
            id="parentSelector"
            onClick={() => {
              // @ts-ignore
              setParent(document.getElementById("parentSelector").value);
            }}
            width={"sm"}
            borderRadius="12px"
          >
            <option value="mother">Mother</option>
            <option value="father">Father</option>
          </Select>
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
              name: "",
              surname: "",
              email: "",
              phone: "",
            }}
            onSubmit={async (values) => {
              if (parent === "mother") {
                const { error } = await addMother({
                  options: {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phone: parseInt(values.phone),
                  },
                });
                if (!error) {
                  toast({
                    title: "Mother added successfully",
                    description: "We've added your mother for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              } else if (parent === "father") {
                const { error } = await addFather({
                  options: {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phone: parseInt(values.phone),
                  },
                });
                if (!error) {
                  toast({
                    title: "Father added successfully",
                    description: "We've added your father for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              } else {
                toast({
                  title: "There was an error",
                  description: "You didn't select parent type!",
                  status: "error",
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
                    Add {!parent ? "" : parent}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateParents);
