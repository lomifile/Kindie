import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useMeQuery, useUpdateUserMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  let body = null;
  useIsAuth();
  const [redirect, setRedirect] = useState(false);
  const [{ data, fetching }] = useMeQuery();
  const [, updateUser] = useUpdateUserMutation();
  const toast = useToast();

  if (fetching) {
    body = (
      <Layout navbarVariant={"user"} variant="column">
        <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Layout>
    );
  } else if (!fetching && !data.me && !redirect) {
    body = (
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
    );
  } else {
    body = (
      <Layout navbarVariant={"user"} variant="column">
        <title>Profile</title>
        <Flex>
          <Heading color="blue.400">My account</Heading>
        </Flex>
        <Stack spacing={10}>
          <Box
            mb={"5rem"}
            mt={5}
            borderRadius="12px"
            border={"1px"}
            borderColor="blue.400"
            p={5}
          >
            <Stack p={2} spacing={4}>
              <Formik
                initialValues={{
                  name: data.me?.Name,
                  surname: data.me?.Surname,
                  role: data.me?.Role,
                  email: data.me?.Email,
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await updateUser({
                    options: {
                      name: values.name,
                      surname: values.surname,
                      email: values.email,
                      role: values.role,
                      password: values.password,
                    },
                  });
                  if (response.data.updateUser.errors) {
                    setErrors(toErrormap(response.data.updateUser.errors));
                  } else {
                    toast({
                      title: "Account updated!",
                      description: "We've updated your account for you.",
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
                        label="Your name"
                        type="text"
                      />
                      <InputField
                        name="surname"
                        placeholder="Last name"
                        label="Your last name"
                        type="text"
                      />
                      <InputField
                        name="role"
                        placeholder="Role"
                        label="Your role"
                        type="text"
                      />
                      {/* <Select
                        name="role"
                        style={{ borderRadius: "12px" }}
                        defaultValue={data?.me.Role}
                      >
                        <option value="Teacher">Teacher</option>
                        <option value="Headmaster">Headmaster</option>
                        <option value="Pedagogue">Pedagogue</option>
                      </Select> */}
                      <InputField
                        name="email"
                        placeholder="Email"
                        label="Your email"
                        type="email"
                      />
                      <InputField
                        name="password"
                        placeholder="Password"
                        label="Input your password"
                        type="password"
                      />
                      <Stack mt={"1rem"}>
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
                          Update your data
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Layout>
    );
  }
  return body;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
