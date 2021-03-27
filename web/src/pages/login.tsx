import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import { useLoginMutation, useResendEmailMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { toErrormap } from "../utils/toErrorMap";
import { Footer } from "../components/Footer";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [, login] = useLoginMutation();
  const [, resendEmail] = useResendEmailMutation();

  const [verified, setVerified] = useState(false);
  const [remail, setResendEmail] = useState("");

  const toast = useToast();
  const router = useRouter();

  return (
    <Flex
      p={200}
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <title>Sign in</title>
      {verified ? (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          mb={10}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Your account is not verified!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your account is not verified! If you didn't recive any email{" "}
            <Link
              onClick={async () => {
                await resendEmail({
                  email: remail,
                });
              }}
              color="blue.400"
            >
              click here
            </Link>{" "}
            to send a new one!
          </AlertDescription>
        </Alert>
      ) : null}
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          Sign in
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              email: values.email,
              password: values.password,
            });
            if (response.data?.login.errors) {
              if (response.data?.login.errors[0].field === "confirmation") {
                setVerified(true);
                setResendEmail(values.email);
              }
              setErrors(toErrormap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/dashboard");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4} marginBottom="1rem">
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Your email"
                  type="email"
                />
                <Stack justifyContent="space-between">
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Your password"
                    type="password"
                  />
                </Stack>
                <Stack marginBottom="1rem">
                  <NextLink href="/forgot-password">
                    <Link color="secondary.link" fontSize="sm" fontWeight="500">
                      Forgot Password?
                    </Link>
                  </NextLink>
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
                    Log in
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            Don't have an account?
          </Text>
          <NextLink href="/register">
            <Button
              borderRadius="12px"
              borderColor="blue.400"
              variant="outline"
              color="blue.400"
            >
              Sign up
            </Button>
          </NextLink>
        </Stack>
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
