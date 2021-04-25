import {
  Flex,
  Box,
  Heading,
  Stack,
  Link,
  Button,
  Divider,
  Text,
  Select,
  FormLabel,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import { useRegisterMutation } from "../generated/graphql";
import router, { useRouter } from "next/router";
import { toErrormap } from "../utils/toErrorMap";
import { Footer } from "../components/Footer";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [privacy, setPrivacy] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const [, register] = useRegisterMutation();
  return (
    <Flex
      p={150}
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <title>Register</title>
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          Sign up
        </Heading>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            repeatPassword: "",
            role: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              options: {
                name: values.name,
                surname: values.surname,
                email: values.email,
                role: values.role,
                password: values.password,
                repeatPassword: values.repeatPassword,
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrormap(response.data.register.errors));
            } else if (response.data?.register.user) {
              toast({
                title: "Your registration was a success",
                description:
                  "We've send you an email where you need to confim your account!",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              router.push("/");
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
                  required
                />
                <InputField
                  name="surname"
                  placeholder="Last name"
                  label="Your last name"
                  type="text"
                  required
                />
                <Text mb={"-10px"}>Role</Text>
                <Select
                  name="role"
                  style={{ borderRadius: "12px" }}
                  placeholder="Select your role"
                  required
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Headmaster">Headmaster</option>
                  <option value="Pedagogue">Pedagogue</option>
                </Select>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Your email"
                  type="email"
                  required
                />
                <Stack spacing={5} justifyContent="space-between">
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Your password"
                    type="password"
                    required
                  />
                  <InputField
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    label="Repeat password"
                    type="password"
                  />
                  <Checkbox
                    onClick={() => {
                      setPrivacy(true);
                    }}
                  >
                    By checking this I acept Privacy policy and Terms and
                    conditions
                  </Checkbox>
                </Stack>
                <Stack marginBottom="1rem">
                  <Button
                    isDisabled={!privacy}
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
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            Already have an account?
          </Text>
          <NextLink href="/login">
            <Button
              borderRadius="12px"
              borderColor="blue.400"
              variant="outline"
              color="blue.400"
            >
              Sign in
            </Button>
          </NextLink>
        </Stack>
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
