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
  InputGroup,
  InputRightElement,
  IconButton,
  useColorMode,
  useColorModeValue,
  border,
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
import { useTranslation } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";
import { bgColor } from "../utils/colorModeColors";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [privacy, setPrivacy] = useState(true);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [role, setRole] = useState("");
  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const router = useRouter();
  const toast = useToast();

  const [, register] = useRegisterMutation();

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
  const borderColor = useColorModeValue("gray.200", "brand.200");
  const txtBorderColor = useColorModeValue("gray.400", "brand.200");
  const termsColor = useColorModeValue("black", "brand.200");
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
      <title>{t("register.main-header")}</title>
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
          {t("register.main-header")}
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
                role: role,
                password: values.password,
                repeatPassword: values.repeatPassword,
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrormap(response.data.register.errors));
            } else if (response.data?.register.user) {
              toast({
                title: t("register.toast.title"),
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
                  placeholder={t("register.form.placeholders.name")}
                  label={t("register.form.name")}
                  type="text"
                  required
                />
                <InputField
                  name="surname"
                  placeholder={t("register.form.placeholders.surname")}
                  label={t("register.form.surname")}
                  type="text"
                  required
                />
                <Text mb={"-10px"} color={textColor}>
                  {t("register.form.role")}
                </Text>
                <Select
                  name="role"
                  style={{ borderRadius: "12px" }}
                  placeholder={t("register.form.placeholders.role")}
                  onChange={handleChange}
                  color={txtBorderColor}
                  backgroundColor={bg}
                  borderColor={borderColor}
                  required
                >
                  <option value="Teacher">
                    {t("register.selector.teacher")}
                  </option>
                  <option value="Headmaster">
                    {t("register.selector.headmaster")}
                  </option>
                  <option value="Pedagogue">
                    {t("register.selector.pedagouge")}
                  </option>
                </Select>
                <InputField
                  name="email"
                  placeholder={t("register.form.placeholders.email")}
                  label={t("register.form.email")}
                  type="email"
                  required
                />
                <Stack spacing={5} justifyContent="space-between">
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
                        backgroundColor={showPasswordBtnColor}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <InputField
                    name="repeatPassword"
                    placeholder={t(
                      "register.form.placeholders.repeat-password"
                    )}
                    label={t("register.form.repeat-password")}
                    type="password"
                  />
                  <Checkbox
                    color={termsColor}
                    onChange={() => {
                      setPrivacy(!privacy);
                    }}
                  >
                    {t("register.form.privacy")}
                  </Checkbox>
                </Stack>
                <Stack marginBottom="1rem">
                  <Button
                    isDisabled={privacy}
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
                    {t("register.form.btn")}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" color={textColor} fontWeight="500">
            {t("register.text.acc")}
          </Text>
          <NextLink href="/login">
            <Button
              variant={colorMode === "dark" ? "soild" : "outline"}
              borderColor={btnBorderColor}
              color={btnRegTextColor}
              bg={btnRegisterColor}
              borderRadius="12px"
            >
              {t("register.text.btn")}
            </Button>
          </NextLink>
        </Stack>
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
