import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Flex,
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import forgotPassword from "../forgot-password";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { toErrormap } from "../../utils/toErrorMap";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const [complete, setComplete] = useState(false);
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
      <title>Change password</title>
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          Change password
        </Heading>
        <Formik
          initialValues={{ newPassword: "", repeatNewPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({
              newPassword: values.newPassword,
              repeatNewPassword: values.repeatNewPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });

            if (response.data?.changePassword.errors) {
              const errorMap = toErrormap(response.data.changePassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              } else {
                setErrors(errorMap);
              }
            } else if (response.data?.changePassword.user) {
              setComplete(true);
            }
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
                  You changed your password successfully!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Good job! you changed your password successfully. Now log back
                  in and get those hours!
                </AlertDescription>
              </Alert>
            ) : (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <Stack justifyContent="space-between">
                    <InputField
                      name="newPassword"
                      placeholder="New password"
                      label="Input your new password"
                      type="password"
                    />
                    <InputField
                      name="repeatNewPassword"
                      placeholder="Repeat password"
                      label="Repeat your new password"
                      type="password"
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
                      Change password
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
