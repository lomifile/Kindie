import {
  Box,
  Button,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useToast,
  Text,
  HStack,
  Divider,
  Radio,
  RadioGroup,
  UseToastOptions,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  Exact,
  MeQuery,
  UpdatePassword,
  UpdatePasswordMutation,
  UpdateUserInput,
  UpdateUserMutation,
  useMeQuery,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
} from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation, TFunction } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";
import { CustomAlert } from "../components/Alerts";
import isElectron from "is-electron";
import { i18n } from "i18next";
import { OperationContext, OperationResult } from "urql";

const SelectorBtns = (
  selector: string,
  setSelector: React.Dispatch<React.SetStateAction<string>>,
  t: TFunction<"data">
) => (
  <>
    <Button
      variant="ghost"
      {...(selector === "#profile" ? { bg: "gray.200" } : null)}
      color="blue.400"
      borderRadius={"12px"}
      p={2}
      _hover={{
        backgroundColor: "gray.100",
      }}
      onClick={() => {
        setSelector("#profile");
      }}
    >
      {t("settings.menu-selector.#profile")}
    </Button>
    {isElectron() ? (
      <Button
        variant="ghost"
        {...(selector === "#app" ? { bg: "gray.200" } : null)}
        color="blue.400"
        borderRadius={"12px"}
        p={2}
        _hover={{
          backgroundColor: "gray.100",
        }}
        onClick={() => {
          setSelector("#app");
        }}
      >
        {t("settings.menu-selector.#app")}
      </Button>
    ) : null}
    <Button
      borderRadius={"12px"}
      variant="ghost"
      {...(selector === "#password" ? { bg: "gray.200" } : null)}
      color="blue.400"
      p={2}
      _hover={{
        backgroundColor: "gray.100",
      }}
      onClick={() => {
        setSelector("#password");
      }}
    >
      {t("settings.menu-selector.#password")}
    </Button>
  </>
);

const VerticalMenu = (
  selector: string,
  setSelector: React.Dispatch<React.SetStateAction<string>>,
  t: TFunction<"data">
) => (
  <HStack spacing={4}>
    <Box
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: "contain",
      }}
      top="6.5rem"
      w="280px"
      h={{
        base: "auto",
        md: "auto",
        lg: "calc(((70vh - 1.5rem) - 64px) - 42px);",
      }}
      pr="8"
      pb="6"
      pl="3"
      pt="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: "block", md: "block" }}
    >
      <Stack spacing={5}>{SelectorBtns(selector, setSelector, t)}</Stack>
    </Box>
    <Divider orientation="vertical" />
  </HStack>
);

const ChangeLanguage = (i18n: i18n, t: TFunction<"data">) => (
  <Box id="#app" minW={["100%", "100%", "100%", "70%", "800px"]}>
    <Stack spacing={10}>
      <Box
        w={["100%", "100%", "80%", "80%", "80%"]}
        rounded={["xs", "sm", "md", "lg", "xl"]}
        display="inline-flex"
      >
        <Text mr={5}>{t("settings.app-language")}:</Text>
        <RadioGroup
          onChange={(e) => {
            i18n.changeLanguage(e.toString());
          }}
          defaultValue={i18n.language}
        >
          <Stack direction="row">
            <Radio value="hr">🇭🇷</Radio>
            <Radio value="en">🇬🇧</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Stack>
  </Box>
);

const ProfileCard = (
  data: MeQuery,
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"data">,
  show: boolean,
  handleClick: () => void,
  updateUser: (
    variables?: Exact<{
      options: UpdateUserInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateUserMutation,
      Exact<{
        options: UpdateUserInput;
      }>
    >
  >
) => (
  <Box id="#profile" minW={["100%", "100%", "100%", "70%", "800px"]}>
    <Stack spacing={10}>
      <Box
        w={["100%", "100%", "80%", "80%", "80%"]}
        rounded={["xs", "sm", "md", "lg", "xl"]}
      >
        <Stack p={2} spacing={4}>
          <Formik
            initialValues={{
              name: data.me?.Name,
              surname: data.me?.Surname,
              email: data.me?.Email,
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await updateUser({
                options: {
                  name: values.name,
                  surname: values.surname,
                  email: values.email,
                  password: values.password,
                },
              });
              if (response.data.updateUser.errors) {
                setErrors(toErrormap(response.data.updateUser.errors));
              } else {
                toast({
                  title: t("settings.toast.title"),
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
                    placeholder={t("settings.form.placeholders.name")}
                    label={t("settings.form.name")}
                    type="text"
                  />
                  <InputField
                    name="surname"
                    placeholder={t("settings.form.placeholders.surname")}
                    label={t("settings.form.surname")}
                    type="text"
                  />
                  <InputField
                    name="email"
                    placeholder={t("settings.form.placeholders.email")}
                    label={t("settings.form.email")}
                    type="email"
                  />
                  <InputGroup size="md">
                    <InputField
                      name="password"
                      placeholder={t("settings.form.placeholders.password")}
                      label={t("settings.form.password")}
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
                      {t("settings.form.btn")}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

const ChangePassword = (
  toast: (options?: UseToastOptions) => string | number,
  show: boolean,
  t: TFunction<"data">,
  handleClick: () => void,
  updatePassowrd: (
    variables?: Exact<{
      options: UpdatePassword;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdatePasswordMutation,
      Exact<{
        options: UpdatePassword;
      }>
    >
  >
) => (
  <Box id="#password" minW={["100%", "100%", "100%", "70%", "800px"]}>
    <Stack spacing={10}>
      <Box
        w={["100%", "100%", "80%", "80%", "80%"]}
        rounded={["xs", "sm", "md", "lg", "xl"]}
      >
        <Stack p={2} spacing={4}>
          <Formik
            initialValues={{
              password: "",
              repeatPassword: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await updatePassowrd({
                options: {
                  password: values.password,
                  repeatPassword: values.repeatPassword,
                },
              });
              if (response.data.updatePassword.errors) {
                setErrors(toErrormap(response.data.updatePassword.errors));
              } else {
                toast({
                  title: t("settings.toast.title"),
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
                  <InputGroup size="md">
                    <InputField
                      name="password"
                      placeholder={t("settings.form.placeholders.password")}
                      label={t("settings.form.password")}
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
                    placeholder={t(
                      "settings.form.placeholders.repeat-password"
                    )}
                    label={t("settings.form.repeat-password")}
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
                      {t("settings.form.btn-pass")}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

const Settings: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t, i18n } = useTranslation("data", { useSuspense: false });
  let body = null;
  const [redirect, setRedirect] = useState(false);
  const [{ data, fetching }] = useMeQuery();
  const [, updateUser] = useUpdateUserMutation();
  const [, updatePassowrd] = useUpdatePasswordMutation();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [selector, setSelector] = useState("#profile");

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
      <CustomAlert
        data={t("settings.alert.desc")}
        name={t("settings.alert.title")}
        status="error"
      />
    );
  } else {
    body = (
      <Layout navbarVariant={"user"} variant="column">
        <title>{t("settings.main-header")}</title>
        <Flex
          mt="10"
          p="5"
          justify={{ base: "center", md: "center", xl: "space-between" }}
          direction={{ base: "column", md: "column", lg: "row" }}
        >
          {VerticalMenu(selector, setSelector, t)}
          {selector === "#app" ? ChangeLanguage(i18n, t) : null}
          {selector === "#profile"
            ? ProfileCard(data, toast, t, show, handleClick, updateUser)
            : null}
          {selector === "#password"
            ? ChangePassword(toast, show, t, handleClick, updatePassowrd)
            : null}
        </Flex>
      </Layout>
    );
  }
  return body;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Settings);
