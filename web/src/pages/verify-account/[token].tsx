import {
  Flex,
  Box,
  Heading,
  Stack,
  Button,
  Divider,
  Checkbox,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation, TFunction } from "react-i18next";
import { Footer } from "../../components/Footer";
import {
  Exact,
  useVerifyAccountMutation,
  VerifyAccountMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { NextPage } from "next";
import { OperationContext, OperationResult } from "urql";

const VerifyAccountForm = (
  router: NextRouter,
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"translation">,
  verifyAccount: (
    variables?: Exact<{
      token: string;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      VerifyAccountMutation,
      Exact<{
        token: string;
      }>
    >
  >
) => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  return (
    <Formik
      initialValues={{
        token: typeof router.query.token === "string" ? router.query.token : "",
      }}
      onSubmit={async () => {
        const response = await verifyAccount({
          token:
            typeof router.query.token === "string" ? router.query.token : "",
        });
        if (response.data?.verifyAccount.errors) {
          toast({
            title:
              response.data?.verifyAccount.errors[0].field.toLocaleUpperCase(),
            description: response.data?.verifyAccount.errors[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: t("verify-account.toast.title"),
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
            <Checkbox
              onChange={() => {
                handleClick();
              }}
            >
              {t("verify-account.privacy")}
            </Checkbox>
            <Stack marginBottom="1rem">
              <Button
                isDisabled={!checked}
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
                {t("verify-account.btn")}
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const VerifyAccount: NextPage = ({}) => {
  const { t } = useTranslation();
  const [, verifyAccount] = useVerifyAccountMutation();
  const router = useRouter();
  const toast = useToast();

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
      mt={["10px", "10px", "10px", "auto", "auto"]}
      mb={["-0", "-0", "-0", "auto", "auto"]}
    >
      <Box
        width={{ base: "90%", md: "400px" }}
        rounded="lg"
        p={5}
        border={"1px"}
        borderColor="blue.400"
        borderRadius={"12px"}
      >
        <Heading color={"blue.400"} marginBottom="1.5rem">
          {t("verify-account.main-header")}
        </Heading>
        {VerifyAccountForm(router, toast, t, verifyAccount)}
        <Divider marginBottom="1rem" />
      </Box>
      <Footer variant="small" />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(VerifyAccount);
