import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  UseToastOptions,
  Stack,
  Button,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { OperationContext, OperationResult } from "@urql/core";
import { Formik, Form } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { InputField } from "../components/InputField";
import {
  Exact,
  ParentsInput,
  AddFatherMutation,
  useAddFatherMutation,
} from "../generated/graphql";
import { ArrowBackIcon } from "@chakra-ui/icons";
import isElectron from "is-electron";
import { NextRouter, useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreateFatherForm = (
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"translation">,
  addFather: (
    variables?: Exact<{
      options: ParentsInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      AddFatherMutation,
      Exact<{
        options: ParentsInput;
      }>
    >
  >,
  router: NextRouter
) => (
  <Formik
    initialValues={{
      name: "",
      surname: "",
      email: "",
      phone: "",
    }}
    onSubmit={async (values) => {
      const { error } = await addFather({
        options: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          phone: parseInt(values.phone),
        },
      });
      if (!error) {
        toast({
          title: t("create-parents.toast.father.title"),
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
            placeholder={t("create-parents.form.placeholders.name")}
            label={t("create-parents.form.name")}
            type="text"
            required
          />
          <InputField
            name="surname"
            placeholder={t("create-parents.form.placeholders.surname")}
            label={t("create-parents.form.surname")}
            type="text"
            required
          />
          <InputField
            name="email"
            placeholder={t("create-parents.form.placeholders.email")}
            label={t("create-parents.form.email")}
            type="email"
            required
          />
          <InputField
            name="phone"
            placeholder={t("create-parents.form.placeholders.phone")}
            label={t("create-parents.form.phone")}
            type="text"
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
            {t("create-parents.form.btn")}{" "}
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
);

const CreateFather: React.FC<{}> = ({}) => {
  const { t } = useTranslation();
  const [, addFather] = useAddFatherMutation();
  const toast = useToast();
  const router = useRouter();
  useIsAuth();

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{t("create-parents.main-header")}</title>
      <Flex
        justify={["center", "center", "center", "left", "left"]}
        mt={5}
        mb={2}
      >
        <HStack spacing={5}>
          {isElectron() ? (
            <IconButton
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
              aria-label={"Back"}
              icon={<ArrowBackIcon />}
              mr={5}
            />
          ) : null}
          <Heading color="blue.400">
            {t("create-parents.main-header-father")}
          </Heading>
        </HStack>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {CreateFatherForm(toast, t, addFather, router)}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateFather);
