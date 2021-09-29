import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useToast,
  Stack,
  Flex,
  Button,
  Heading,
  Box,
  IconButton,
  HStack,
  UseToastOptions,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useGetId } from "../../../utils/getID";
import {
  Exact,
  FindFatherQuery,
  ParentsInput,
  UpdateFatherMutation,
  useFindFatherQuery,
  useUpdateFatherMutation,
} from "../../../generated/graphql";
import { useTranslation, TFunction } from "react-i18next";
import { useIsAuth } from "../../../utils/useIsAuth";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { CustomAlert } from "../../../components/Alerts";
import { CustomSpinner } from "../../../components/Spinner";
import { NextRouter } from "next/router";
import { OperationContext, OperationResult } from "urql";
import moment from "moment";

const EditFatherForm = (
  data: FindFatherQuery,
  updateFather: (
    variables?: Exact<{
      fatherId: number;
      options: ParentsInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateFatherMutation,
      Exact<{
        fatherId: number;
        options: ParentsInput;
      }>
    >
  >,
  toast: (options?: UseToastOptions) => string | number,
  router: NextRouter,
  t: TFunction<"data">
) => (
  <Formik
    initialValues={{
      name: data.findFather.Name,
      surname: data.findFather.Surname,
      email: data.findFather.Email,
      phone: data.findFather.Phone,
    }}
    onSubmit={async (values) => {
      const { error } = await updateFather({
        fatherId: data.findFather.Id,
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
          title: t("edit-father.toast.title"),
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
            placeholder={t("edit-father.form.placeholders.name")}
            label={t("edit-father.form.name")}
            type="text"
            required
          />
          <InputField
            name="surname"
            placeholder={t("edit-father.form.placeholders.surname")}
            label={t("edit-father.form.surname")}
            type="text"
            required
          />
          <InputField
            name="email"
            placeholder={t("edit-father.form.placeholders.email")}
            label={t("edit-father.form.email")}
            type="email"
            required
          />
          <InputField
            name="phone"
            placeholder={t("edit-father.form.placeholders.phone")}
            label={t("edit-father.form.phone")}
            type="number"
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
                    {data.findFather.createdBy.Name +
                      " " +
                      data.findFather.createdBy.Surname}
                  </Td>
                  <Td>
                    {moment(data.findFather.createdAt).format("DD-MM-yyyy")}
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
                    {data.findFather.updatedBy?.Name +
                      " " +
                      data.findFather.updatedBy?.Surname}
                  </Td>
                  <Td>
                    {moment(data.findFather.updatedAt).format("DD-MM-yyyy")}
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
            {t("edit-father.form.btn")}
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
);

const EditFather = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const router = useRouter();
  useIsAuth();
  const id = useGetId();
  const toast = useToast();
  const [{ data, fetching }] = useFindFatherQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });
  const [, updateFather] = useUpdateFatherMutation();

  if (fetching) {
    return <CustomSpinner />;
  } else if (!data?.findFather) {
    return (
      <CustomAlert
        name={t("edit-father.alert.title")}
        status="error"
        data={t("edit-father.alert.desc")}
      />
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{t("edit-father.main-header")}</title>
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
          <Heading color="blue.400">{t("edit-father.main-header")}</Heading>
        </HStack>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {EditFatherForm(data, updateFather, toast, router, t)}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditFather);
