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
import { Footer } from "../../components/Footer";
import { useTranslation } from "react-i18next";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
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
      <title>{t("change-password.main-header")}</title>
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          {t("change-password.main-header")}
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
                  {t("change-password.alert.success.title")}
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {t("change-password.alert.success.desc")}
                </AlertDescription>
              </Alert>
            ) : (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <Stack justifyContent="space-between">
                    <InputField
                      name="newPassword"
                      placeholder={t("change-password.placeholders.password")}
                      label={t("change-password.password")}
                      type="password"
                    />
                    <InputField
                      name="repeatNewPassword"
                      placeholder={t(
                        "change-password.placeholders.repeat-password"
                      )}
                      label={t("change-password.repeat-password")}
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
                      {t("change-password.btn")}
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )
          }
        </Formik>
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
