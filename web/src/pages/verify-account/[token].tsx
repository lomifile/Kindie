import {
  Flex,
  Box,
  Heading,
  Stack,
  Link,
  Button,
  Divider,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../../components/Footer";
import { useVerifyAccountMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { NextPage } from "next";

const VerifyAccount: NextPage = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [checked, setChecked] = useState(false);
  const [, verifyAccount] = useVerifyAccountMutation();
  const router = useRouter();
  const toast = useToast();
  const handleClick = () => {
    setChecked(true);
  };

  return (
    <Flex
      p={200}
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
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
        <Formik
          initialValues={{
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await verifyAccount({
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (response.data?.verifyAccount.errors) {
              toast({
                title: response.data?.verifyAccount.errors[0].field.toLocaleUpperCase(),
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
                  onClick={() => {
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
        <Divider marginBottom="1rem" />
      </Box>
      <Footer variant="small" />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient)(VerifyAccount);
