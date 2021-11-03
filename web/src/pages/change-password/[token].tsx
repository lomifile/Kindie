import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Flex, Box, Heading, Stack, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import {
  ChangePasswordMutation,
  Exact,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { NextRouter, useRouter } from "next/router";
import { toErrormap } from "../../utils/toErrorMap";
import { Footer } from "../../components/Footer";
import { TFunction, useTranslation } from "react-i18next";
import { NextPage } from "next";
import { OperationContext, OperationResult } from "urql";
import { CustomAlert } from "../../components/Alerts";

const ChangePasswordForm = (
  changePassword: (
    variables?: Exact<{
      token: string;
      newPassword: string;
      repeatNewPassword: string;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      ChangePasswordMutation,
      Exact<{
        token: string;
        newPassword: string;
        repeatNewPassword: string;
      }>
    >
  >,
  router: NextRouter,
  setTokenError: (value: React.SetStateAction<string>) => void,
  setComplete: (value: React.SetStateAction<boolean>) => void,
  complete: boolean,
  t: TFunction<"translation">
) => (
  <Formik
    initialValues={{ newPassword: "", repeatNewPassword: "" }}
    onSubmit={async (values, { setErrors }) => {
      const response = await changePassword({
        newPassword: values.newPassword,
        repeatNewPassword: values.repeatNewPassword,
        token: typeof router.query.token === "string" ? router.query.token : "",
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
        <CustomAlert
          name={t("change-password.alert.success.title")}
          data={t("change-password.alert.success.desc")}
          status={"success"}
        />
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
                placeholder={t("change-password.placeholders.repeat-password")}
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
);

const ChangePassword: NextPage = ({}) => {
  const { t } = useTranslation();
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
        {ChangePasswordForm(
          changePassword,
          router,
          setTokenError,
          setComplete,
          complete,
          t
        )}
      </Box>
      <Footer variant={"small"} />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
