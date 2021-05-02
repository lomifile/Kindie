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
  useColorMode,
  useColorModeValue,
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
import { useTranslation } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";
import { bgColor } from "../utils/colorModeColors";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [, login] = useLoginMutation();
  const [, resendEmail] = useResendEmailMutation();

  const [verified, setVerified] = useState(false);
  const [remail, setResendEmail] = useState("");

  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { colorMode } = useColorMode();
  const bg = useColorModeValue(bgColor.light, bgColor.dark);
  const headerColor = useColorModeValue("blue.400", "brand.100");
  const textColor = useColorModeValue("primary.800", "brand.200");
  const btnColor = useColorModeValue("blue.400", "transparent");
  const btnBorderColor = useColorModeValue("blue.400", "brand.200");
  const btnTextColor = useColorModeValue("white", "brand.200");
  const btnRegTextColor = useColorModeValue("blue.400", bgColor.dark);
  const btnRegisterColor = useColorModeValue("transparent", "brand.200");
  const boxBorderColor = useColorModeValue("blue.400", "brand.200");
  const showPasswordBtnColor = useColorModeValue("transparent", "brand.200");

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
      bg={bg}
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
              color={headerColor}
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
          boxBorderColor,
          boxBorderColor,
        ]}
        borderRadius={"12px"}
      >
        <Heading color={headerColor} marginBottom="1.5rem">
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
                  // @ts-ignore
                  bg={bg}
                  name="email"
                  placeholder={t("login.form.placeholders.email")}
                  label={t("login.form.email")}
                  type="email"
                />
                <Stack justifyContent="space-between">
                  <InputGroup size="md">
                    <InputField
                      // @ts-ignore
                      bg={bg}
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
                        backgroundColor={showPasswordBtnColor}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                </Stack>
                <Stack marginBottom="1rem">
                  <NextLink href="/forgot-password">
                    <Link color={headerColor} fontSize="sm" fontWeight="500">
                      {t("login.form.forgot")}
                    </Link>
                  </NextLink>
                  <Button
                    variant={colorMode === "dark" ? "outline" : "solid"}
                    bg={btnColor}
                    color={btnTextColor}
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
          <Text textAlign="center" color={textColor} fontWeight="500">
            {t("login.text.acc")}
          </Text>
          <NextLink href="/register">
            <Button
              variant={colorMode === "dark" ? "soild" : "outline"}
              borderColor={btnBorderColor}
              color={btnRegTextColor}
              bg={btnRegisterColor}
              borderRadius="12px"
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
