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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useGetId } from "../../../utils/getID";
import {
  useFindFatherQuery,
  useUpdateFatherMutation,
} from "../../../generated/graphql";
import { useTranslation } from "react-i18next";
import { useIsAuth } from "../../../utils/useIsAuth";

interface EditFatherProps {}

const EditFather: React.FC<EditFatherProps> = ({}) => {
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
    return (
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          minH="250px"
          minW="250px"
        />
      </Flex>
    );
  } else if (!data?.findFather) {
    return (
      <Flex
        p={200}
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {t("edit-father.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("edit-father.alert.desc")}
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{t("edit-father.main-header")}</title>
      <Stack spacing={8}>
        <Flex mt={5} mb={2}>
          <Button
            bg="blue.400"
            className="nav-item"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            mr={5}
            mt={1}
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Heading color="blue.400">{t("edit-father.main-header")}</Heading>
        </Flex>
      </Stack>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={10}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
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
                  ...values,
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
                    {t("edit-father.form.btn")}
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

export default withUrqlClient(createUrqlClient)(EditFather);
