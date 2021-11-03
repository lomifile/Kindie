import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useTranslation, TFunction } from "react-i18next";
import { OperationContext, OperationResult } from "urql";
import { CustomAlert } from "../components/Alerts";
import { Footer } from "../components/Footer";
import { InputField } from "../components/InputField";
import {
  Exact,
  ForgotPasswordMutation,
  useForgotPasswordMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPasswordForm = (
  setComplete: React.Dispatch<React.SetStateAction<boolean>>,
  complete: boolean,
  t: TFunction<"translation">,
  forgotPassword: (
    variables?: Exact<{
      email: string;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      ForgotPasswordMutation,
      Exact<{
        email: string;
      }>
    >
  >
) => (
  <Formik
    initialValues={{ email: "" }}
    onSubmit={async (values) => {
      await forgotPassword({
        email: values.email,
      });
      setComplete(true);
    }}
  >
    {({ isSubmitting }) =>
      complete ? (
        <CustomAlert
          name={t("forgot-password.alert.success.title")}
          data={t("forgot-password.alert.success.desc")}
          status={"success"}
        />
      ) : (
        <Form>
          <Stack spacing={4} marginBottom="1rem">
            <Stack justifyContent="space-between">
              <InputField
                name="email"
                placeholder={t("forgot-password.placeholder")}
                label={t("forgot-password.email")}
                type="email"
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
                {t("forgot-password.btn")}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )
    }
  </Formik>
);

const ForgotPassword: React.FC<{}> = ({}) => {
  const { t } = useTranslation();
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

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
      <title>{t("forgot-password.main-header")}</title>
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
          {t("forgot-password.main-header")}
        </Heading>
        {ForgotPasswordForm(setComplete, complete, t, forgotPassword)}
      </Box>
      <Footer variant="small" />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
