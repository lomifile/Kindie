import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../components/InputField";
import {
  useAddFatherMutation,
  useAddMotherMutation,
} from "../generated/graphql";
import { useTranslation } from "react-i18next";
import { useIsAuth } from "../utils/useIsAuth";
import { ArrowBackIcon } from "@chakra-ui/icons";
import isElectron from "is-electron";

const CreateParents: React.FC<{}> = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const [, addMother] = useAddMotherMutation();
  const [, addFather] = useAddFatherMutation();
  const toast = useToast();
  const [parent, setParent] = useState(null);
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
          <Heading color="blue.400">{t("create-parents.main-header")}</Heading>
        </HStack>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Select
          id="parentSelector"
          onClick={() => {
            // @ts-ignore
            setParent(document.getElementById("parentSelector").value);
          }}
          width={["xs", "sm", "md", "md", "md"]}
          borderRadius="12px"
          mb={"25px"}
        >
          <option value="mother">
            {t("create-parents.select.mother.name")}
          </option>
          <option value="father">
            {t("create-parents.select.father.name")}
          </option>
        </Select>
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              phone: "",
            }}
            onSubmit={async (values) => {
              if (parent === "mother") {
                const { error } = await addMother({
                  options: {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phone: parseInt(values.phone),
                  },
                });
                if (!error) {
                  toast({
                    title: t("create-parents.toast.mother.title"),
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              } else if (parent === "father") {
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
                }
              } else {
                toast({
                  title: "There was an error",
                  status: "error",
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
                    isDisabled={!parent}
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
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateParents);
