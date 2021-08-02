import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useTranslation, TFunction } from "react-i18next";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  ContactInput,
  Exact,
  SendEmailMutation,
  useSendEmailMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { AdBanner } from "../components/AdBanner";
import { OperationContext, OperationResult } from "urql";
import { CustomHeader } from "../components/CustomHeader";

const ContactForm = (
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"data">,
  sendEmail: (
    variables?: Exact<{
      input: ContactInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      SendEmailMutation,
      Exact<{
        input: ContactInput;
      }>
    >
  >
) => (
  <Formik
    initialValues={{ email: "", subject: "", message: "" }}
    onSubmit={async (values) => {
      const response = await sendEmail({
        input: {
          ...values,
        },
      });

      if (response) {
        toast({
          title: t("contact-us.toast.title"),
          description: t("contact-us.toast.desc"),
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <InputField
          name="email"
          label={t("contact-us.form.email")}
          type="email"
        />
        <Box mt={4}>
          <InputField name="subject" label={t("contact-us.form.subject")} />
        </Box>
        <Box mt={4}>
          <InputField
            name="message"
            label={t("contact-us.form.message")}
            textArea={true}
          />
        </Box>
        <Flex>
          <Button
            justifySelf="left"
            alignSelf="start"
            mt={5}
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
            {t("contact-us.form.btn")}
          </Button>
        </Flex>
      </Form>
    )}
  </Formik>
);

const Contact: React.FC<{}> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [, sendEmail] = useSendEmailMutation();
  const toast = useToast();
  return (
    <Layout navbarVariant={"normal"} variant="column" navbar={true}>
      <title>{t("contact-us.main-heading")}</title>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={2}
      >
        <Stack
          spacing={4}
          w={{ base: "90%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <CustomHeader data={t("contact-us.main-heading")} />
          <CustomHeader data={t("contact-us.description")} />
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            {t("contact-us.small")}
          </Text>
        </Stack>
        <Flex
          px={10}
          minW="20rem"
          alignItems="normal"
          justifyItems="left"
          justifyContent="left"
          w={{ base: "100%", sm: "100%", md: "50%" }}
          mb={{ base: 12, sm: 12, md: 12 }}
        >
          <Box w={["100%", "100%", "100%", "400px", "400px"]} p={5}>
            {ContactForm(toast, t, sendEmail)}
          </Box>
        </Flex>
      </Flex>
      <AdBanner />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Contact);
