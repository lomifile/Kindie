import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  useFindMotherQuery,
  useUpdateMotherMutation,
} from "../../../generated/graphql";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGetId } from "../../../utils/getID";
import { Layout } from "../../../components/Layout";
import { Formik, Form } from "formik";
import { InputField } from "../../../components/InputField";
import { useTranslation } from "react-i18next";
import { useIsAuth } from "../../../utils/useIsAuth";

interface EditMotherProps {}

const EditMother: React.FC<EditMotherProps> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const router = useRouter();
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
  } else if (!data?.findMother) {
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
            {t("edit-mother.alert.title")}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {t("edit-mother.alert.desc")}
          </AlertDescription>
        </Alert>
      </Flex>
    );
  }
  return (
    <Layout variant={"column"} navbarVariant="user">
      <title>{t("edit-mother.main-header")}</title>
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
            {t("edit-mother.btn-back")}
          </Button>
          <Heading color="blue.400">{t("edit-mother.main-header")}</Heading>
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
              name: data?.findMother.Name,
              surname: data?.findMother.Surname,
              email: data?.findMother.Email,
              phone: data?.findMother.Phone,
            }}
            onSubmit={async (values) => {
              const { error } = await updateMother({
                motherId: data.findMother.Id,
                options: {
                  ...values,
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
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(EditMother);
