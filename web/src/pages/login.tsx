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
  IconButton,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import { useLoginMutation, useResendEmailMutation } from "../generated/graphql";
import Router from "next/router";
import { toErrormap } from "../utils/toErrorMap";
import { Footer } from "../components/Footer";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useTranslation } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [, login] = useLoginMutation();
  const [, resendEmail] = useResendEmailMutation();

  const [verified, setVerified] = useState(false);
  const [remail, setResendEmail] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      p={[0, 0, 0, 200, 200]}
      alignItems="center"
      minHeight="100%"
      width="100%"
      justifyContent="center"
      justifySelf="center"
      justify={{
        s: "center",
        md: "center",
        xl: "center",
      }}
      flexDirection="column"
      mt={["-0", "-0", "-0", "auto", "auto"]}
      mb={["-0", "-0", "-0", "auto", "auto"]}
    >
      <title>{t("login.main-header")}</title>
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
            {t("login.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("login.alert.desc-1")}{" "}
            <Link
              onClick={async () => {
                await resendEmail({
                  email: remail,
                });
              }}
              color="blue.400"
            >
              {t("login.alert.desc-3")}
            </Link>{" "}
            {t("login.alert.desc-3")}
          </AlertDescription>
        </Alert>
      ) : null}
      <Box
        w={["100%", "100%", "100%", "400px", "400px"]}
        rounded={["xs", "sm", "md", "lg", "xl"]}
        p={5}
        border={["0", "0", "0", "1px", "1px"]}
        borderColor={[
          "transparent",
          "transparent",
          "transparent",
          "blue.400",
          "blue.400",
        ]}
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          {t("login.main-header")}
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
              if (typeof Router.query.next === "string") {
                Router.push(Router.query.next);
              } else {
                Router.push("/dashboard");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={4} marginBottom="1rem">
                <InputField
                  name="email"
                  placeholder={t("login.form.placeholders.email")}
                  label={t("login.form.email")}
                  type="email"
                />
                <Stack justifyContent="space-between">
                  <InputGroup size="md">
                    <InputField
                      name="password"
                      placeholder={t("login.form.placeholders.password")}
                      label={t("login.form.password")}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement mt={8} width="4.5rem">
                      <IconButton
                        aria-label="View password"
                        icon={<ViewIcon />}
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                </Stack>
                <Stack marginBottom="1rem">
                  <NextLink href="/forgot-password">
                    <Link color="secondary.link" fontSize="sm" fontWeight="500">
                      {t("login.form.forgot")}
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
                    {t("login.form.btn")}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            {t("login.text.acc")}
          </Text>
          <NextLink href="/register">
            <Button
              borderRadius="12px"
              borderColor="blue.400"
              variant="outline"
              color="blue.400"
            >
              {t("login.text.btn")}
            </Button>
          </NextLink>
        </Stack>
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
