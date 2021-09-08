import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  Divider,
  Text,
  Select,
  Checkbox,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  UseToastOptions,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import {
  Exact,
  RegisterMutation,
  useRegisterMutation,
  UsernamePasswordInput,
} from "../generated/graphql";
import { NextRouter, useRouter } from "next/router";
import { toErrormap } from "../utils/toErrorMap";
import { Footer } from "../components/Footer";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useTranslation, TFunction } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";
import { OperationContext, OperationResult } from "urql";

const RegisterForm = (
  role: string,
  toast: (options?: UseToastOptions) => string | number,
  router: NextRouter,
  t: TFunction<"data">,
  handleChange: (e: any) => void,
  handleClick: () => void,
  show: boolean,
  privacy: boolean,
  setPrivacy: React.Dispatch<React.SetStateAction<boolean>>,
  register: (
    variables?: Exact<{
      options: UsernamePasswordInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      RegisterMutation,
      Exact<{
        options: UsernamePasswordInput;
      }>
    >
  >
) => (
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
          <Text mb={"-10px"}>{t("register.form.role")}</Text>
          <Select
            name="role"
            style={{ borderRadius: "12px" }}
            placeholder={t("register.form.placeholders.role")}
            onChange={handleChange}
            required
          >
            <option value="Teacher">{t("register.selector.teacher")}</option>
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
                placeholder={t("register.form.placeholders.password")}
                label={t("register.form.password")}
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
            <InputField
              name="repeatPassword"
              placeholder={t("register.form.placeholders.repeat-password")}
              label={t("register.form.repeat-password")}
              type="password"
            />
            <Checkbox
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
              {t("register.form.btn")}
            </Button>
          </Stack>
        </Stack>
      </Form>
    )}
  </Formik>
);

const Register: React.FC<{}> = ({}) => {
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
          "blue.400",
          "blue.400",
        ]}
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          {t("register.main-header")}
        </Heading>
        {RegisterForm(
          role,
          toast,
          router,
          t,
          handleChange,
          handleClick,
          show,
          privacy,
          setPrivacy,
          register
        )}
        <Divider marginBottom="1rem" />
        <Stack>
          <Text textAlign="center" fontWeight="500">
            {t("register.text.acc")}
          </Text>
          <NextLink href="/login">
            <Button
              borderRadius="12px"
              borderColor="blue.400"
              variant="outline"
              color="blue.400"
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
