import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  toast,
  Stack,
  Flex,
  Button,
  useToast,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useCreateChildMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";

interface CreateChildProps {}

const CreateChild: React.FC<CreateChildProps> = ({}) => {
  useIsAuth();
  const toast = useToast();
  const router = useRouter();
  const [, createChild] = useCreateChildMutation();
  return (
    <Layout variant="column" navbarVariant="user">
      <HStack spacing={5}>
        <Button
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
        >
          Back
        </Button>
        <Heading color="blue.400">Create child</Heading>
      </HStack>
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
                  BirthDate: values.birthdate,
                  OIB: parseInt(values.oib),
                  Remarks: values.remarks,
                },
              });
              if (!error) {
                toast({
                  title: "Child added successfully",
                  description: "We've added your child for you.",
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
                    name="gender"
                    placeholder="Gender"
                    label="Input gender"
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder="Birth date"
                    label="Input birth date"
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder="PIN"
                    label="Input PIN"
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder="Remarks"
                    label="Input Remarks"
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
                    Add child
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

export default withUrqlClient(createUrqlClient)(CreateChild);
