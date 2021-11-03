import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Exact,
  FindMotherQuery,
  ParentsInput,
  UpdateMotherMutation,
  useFindMotherQuery,
  useUpdateMotherMutation,
} from "../../../generated/graphql";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useTranslation, TFunction } from "react-i18next";
import { useIsAuth } from "../../../utils/useIsAuth";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { OperationContext, OperationResult } from "urql";
import { NextRouter, useRouter } from "next/router";
import { useGetId } from "../../../utils/getID";
import { Layout } from "../../../components/Layout";
import { InputField } from "../../../components/InputField";
import { CustomAlert } from "../../../components/Alerts";
import { CustomSpinner } from "../../../components/Spinner";
import moment from "moment";

const EditMotherForm = (
  data: FindMotherQuery,
  updateMother: (
    variables?: Exact<{
      motherId: number;
      options: ParentsInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateMotherMutation,
      Exact<{
        motherId: number;
        options: ParentsInput;
      }>
    >
  >,
  toast: (options?: UseToastOptions) => string | number,
  router: NextRouter,
  t: TFunction<"translation">
) => (
  <Formik
    initialValues={{
      name: data?.findMother.Name,
      surname: data?.findMother.Surname,
      email: data?.findMother.Email,
      phone: data?.findMother.Phone,
    }}
    onSubmit={async (values) => {
      const { error } = await updateMother({
        motherId: data.findMother.Id,
        options: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          // @ts-expect-error
          phone: parseInt(values.phone),
        },
      });
      if (!error) {
        toast({
          title: t("edit-mother.toast.title"),
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
            placeholder={t("edit-mother.form.placeholders.name")}
            label={t("edit-mother.form.name")}
            type="text"
            required
          />
          <InputField
            name="surname"
            placeholder={t("edit-mother.form.placeholders.surname")}
            label={t("edit-mother.form.surname")}
            type="text"
            required
          />
          <InputField
            name="email"
            placeholder={t("edit-mother.form.placeholders.email")}
            label={t("edit-mother.form.email")}
            type="email"
            required
          />
          <InputField
            name="phone"
            placeholder={t("edit-mother.form.placeholders.phone")}
            label={t("edit-mother.form.phone")}
            type="text"
            required
          />

          <Flex flexDirection="column">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>{t("edit-child.form.placeholders.createdBy")}</Th>
                  <Th>{t("edit-child.form.placeholders.date")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    {data.findMother.createdBy.Name +
                      " " +
                      data.findMother.createdBy.Surname}
                  </Td>
                  <Td>
                    {moment(data.findMother.createdAt).format("DD-MM-yyyy")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table size="sm" mt={5} mb={2}>
              <Thead>
                <Tr>
                  <Th>{t("edit-child.form.placeholders.editedBy")}</Th>
                  <Th>{t("edit-child.form.placeholders.date")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    {data.findMother.updatedBy?.Name +
                      " " +
                      data.findMother.updatedBy?.Surname}
                  </Td>
                  <Td>
                    {moment(data.findMother.updatedAt).format("DD-MM-yyyy")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>

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
            {t("edit-mother.form.btn")}
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
);

const EditMother = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  useIsAuth();
  const id = useGetId();
  const toast = useToast();
  const [{ data, fetching }] = useFindMotherQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });
  const [, updateMother] = useUpdateMotherMutation();

  if (fetching) {
    return <CustomSpinner />;
  } else if (!data?.findMother) {
    return (
      <CustomAlert
        name={t("edit-father.alert.title")}
        status="error"
        data={t("edit-father.alert.desc")}
      />
    );
  }

  return (
    <Layout variant={"column"} navbarVariant="user">
      <title>{t("edit-mother.main-header")}</title>
      <Flex
        justify={["center", "center", "center", "left", "left"]}
        mt={5}
        mb={2}
      >
        <HStack spacing={5}>
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
          />
          <Heading color="blue.400">{t("edit-mother.main-header")}</Heading>
        </HStack>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {EditMotherForm(data, updateMother, toast, router, t)}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditMother);
