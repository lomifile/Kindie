import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Select,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useToast,
  Text,
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
import { useTranslation } from "react-i18next";
import { ViewIcon } from "@chakra-ui/icons";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  let body = null;
  const [redirect, setRedirect] = useState(false);
  const [{ data, fetching }] = useMeQuery();
  const [, updateUser] = useUpdateUserMutation();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [role, setRole] = useState("");
  const handleChange = (e) => {
    setRole(e.target.value);
  };

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
          {t("profile.alert.title")}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {t("profile.alert.desc")}
        </AlertDescription>
      </Alert>
    );
  } else {
    body = (
      <Layout navbarVariant={"user"} variant="column">
        <title>{t("profile.main-header")}</title>
        <Flex>
          <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
            {t("profile.acc")}
          </Heading>
        </Flex>
        <Stack spacing={10}>
          <Box
            mb={"5rem"}
            mt={5}
            w={["100%", "100%", "100%", "700px", "700px"]}
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
                      title: t("profile.toast.title"),
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
                        placeholder={t("profile.form.placeholders.name")}
                        label={t("profile.form.name")}
                        type="text"
                      />
                      <InputField
                        name="surname"
                        placeholder={t("profile.form.placeholders.surname")}
                        label={t("profile.form.surname")}
                        type="text"
                      />
                      <Text mb={"-10px"}>{t("profile.form.role")}</Text>
                      <Select
                        name="role"
                        style={{ borderRadius: "12px" }}
                        onChange={handleChange}
                        defaultValue={data?.me.Role}
                      >
                        <option value="Teacher">
                          {t("profile.selector.teacher")}
                        </option>
                        <option value="Headmaster">
                          {t("profile.selector.headmaster")}
                        </option>
                        <option value="Pedagogue">
                          {t("profile.selector.pedagouge")}
                        </option>
                      </Select>
                      <InputField
                        name="email"
                        placeholder={t("profile.form.placeholders.email")}
                        label={t("profile.form.email")}
                        type="email"
                      />
                      <InputGroup size="md">
                        <InputField
                          name="password"
                          placeholder={t("profile.form.placeholders.password")}
                          label={t("profile.form.password")}
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
                          {t("profile.form.btn")}
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
