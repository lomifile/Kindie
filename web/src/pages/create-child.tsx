import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  toast,
  Stack,
  Flex,
  Button,
  useToast,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useCreateChildMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation } from "react-i18next";

interface CreateChildProps {}

const CreateChild: React.FC<CreateChildProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  const router = useRouter();
  const [, createChild] = useCreateChildMutation();
  return (
    <Layout variant="column" navbarVariant="user">
      <title>{t("create-child.main-header")}</title>
      <HStack spacing={5}>
        <Button
          bg="blue.400"
          colorScheme="navItem"
          borderRadius="12px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          type="submit"
          onClick={() => {
            router.back();
          }}
        >
          {t("create-child.btn-back")}
        </Button>
        <Heading color="blue.400">{t("create-child.main-header")}</Heading>
      </HStack>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: "",
              surname: "",
              gender: "",
              birthdate: "",
              oib: "",
              remarks: "",
            }}
            onSubmit={async (values) => {
              const { error } = await createChild({
                options: {
                  Name: values.name,
                  Surname: values.surname,
                  Gender: values.gender,
                  BirthDate: values.birthdate,
                  OIB: parseInt(values.oib),
                  Remarks: values.remarks,
                },
              });
              if (!error) {
                toast({
                  title: t("create-child.toast.title"),
                  description: t("create-child.roast.description"),
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.back();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={4} marginBottom="1rem">
                  <InputField
                    name="name"
                    placeholder={t("create-child.form.placeholders.name")}
                    label={t("create-child.form.name")}
                    type="text"
                    required
                  />
                  <InputField
                    name="surname"
                    placeholder={t("create-child.form.placeholders.surname")}
                    label={t("create-child.form.surname")}
                    type="text"
                    required
                  />
                  <InputField
                    name="gender"
                    placeholder={t("create-child.form.placeholders.gender")}
                    label={t("create-child.form.gender")}
                    type="text"
                    required
                  />
                  <InputField
                    name="birthdate"
                    placeholder={t("create-child.form.placeholders.birth-date")}
                    label={t("create-child.form.birth-date")}
                    type="date"
                    required
                  />
                  <InputField
                    name="oib"
                    placeholder={t("create-child.form.placeholders.pin")}
                    label={t("create-child.form.pin")}
                    type="text"
                    required
                  />
                  <InputField
                    name="remarks"
                    placeholder={t("create-child.form.placeholders.remarks")}
                    label={t("create-child.form.remarks")}
                    textArea
                    required
                  />
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
                    {t("create-child.form.btn")}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateChild);
