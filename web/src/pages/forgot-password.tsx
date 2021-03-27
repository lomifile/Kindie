import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  Link,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  const year = new Date().getFullYear();
  return (
    <Flex
      p={200}
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <title>Forgot password</title>
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          Forgot password
        </Heading>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            await forgotPassword({
              email: values.email,
            });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  We send you an email!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  We send you an email which contains a link to guide you
                  forward on you password change!
                </AlertDescription>
              </Alert>
            ) : (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <Stack justifyContent="space-between">
                    <InputField
                      name="email"
                      placeholder="Email"
                      label="Input your email"
                      type="email"
                    />
                  </Stack>
                  <Stack marginBottom="1rem">
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
                      Send reset link
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )
          }
        </Formik>
      </Box>
      <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
        <Link className="footer-nav-item" href="#" color="secondary.link">
          Terms
        </Link>
        <Link className="footer-nav-item" href="#" color="secondary.link">
          Privacy Policy
        </Link>
        <Link
          className="footer-nav-item"
          href="/contact"
          color="secondary.link"
        >
          Contact Us
        </Link>
      </Stack>
      <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
        <Text color="secondary.link">&copy; {year}</Text>
        <Link href="/" color="secondary.link" fontWeight="bold">
          DV Organizator
        </Link>
        <Text color="secondary.link">&mdash; All rights reserved</Text>
      </Stack>
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
