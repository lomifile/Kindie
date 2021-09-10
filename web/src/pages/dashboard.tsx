import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Heading,
  Box,
  Text,
  HStack,
  Link,
  Button,
  useDisclosure,
  useToast,
  Divider,
  IconButton,
  UseToastOptions,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { useTranslation, TFunction } from "react-i18next";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  CreateKindergardenMutation,
  DeleteKindergardenMutation,
  Exact,
  KinderGarden,
  KinderGardenInput,
  ShowKindergardenQuery,
  useCreateKindergardenMutation,
  useDeleteKindergardenMutation,
  UseKindergardenMutation,
  useShowKindergardenQuery,
  useUseKindergardenMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { fetchPartOf } from "../utils/fetchPartof";
import { toErrormap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import { CustomAlert } from "../components/Alerts";
import { CustomSpinner } from "../components/Spinner";
import { getUserRole } from "../utils/getUserRole";
import { OperationContext, OperationResult } from "urql";
import { CustomModal } from "../components/CustomModal";

const CreateKindergardenForm = (
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"data">,
  onClose: () => void,
  createKindergarden: (
    variables?: Exact<{
      options: KinderGardenInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      CreateKindergardenMutation,
      Exact<{
        options: KinderGardenInput;
      }>
    >
  >
) => (
  <Formik
    initialValues={{ name: "", city: "", address: "", zipcode: "" }}
    onSubmit={async (values, { setErrors }) => {
      const response = await createKindergarden({
        options: {
          name: values.name,
          city: values.city,
          address: values.address,
          Zipcode: parseInt(values.zipcode),
        },
      });
      if (response.data.createKindergarden.errors) {
        setErrors(toErrormap(response.data.createKindergarden.errors));
      } else {
        toast({
          title: t("dashboard.toast.create.title"),
          status: "success",
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
            placeholder={t("dashboard.form.placeholder.name")}
            label={t("dashboard.form.name")}
            type="text"
            required
          />
          <InputField
            name="address"
            placeholder={t("dashboard.form.placeholder.address")}
            label={t("dashboard.form.address")}
            type="text"
            required
          />
          <InputField
            name="city"
            placeholder={t("dashboard.form.placeholder.city")}
            label={t("dashboard.form.city")}
            type="text"
            required
          />
          <InputField
            name="zipcode"
            placeholder={t("dashboard.form.placeholder.zip-code")}
            label={t("dashboard.form.zip-code")}
            type="text"
            required
          />
        </Stack>
        <Divider mt={5} mb={5} />
        <Flex justify={["center", "center", "center", "right", "right"]} pb={2}>
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
            onClick={onClose}
          >
            {t("dashboard.form.btn")}
          </Button>
        </Flex>
      </Form>
    )}
  </Formik>
);

const OwnedKindergardenCards = (
  data: ShowKindergardenQuery,
  t: TFunction<"data">,
  toast: (options?: UseToastOptions) => string | number,
  useKindergarden: (
    variables?: Exact<{
      kindergardenID: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UseKindergardenMutation,
      Exact<{
        kindergardenID: number;
      }>
    >
  >,
  deleteKindergarden: (
    variables?: Exact<{
      id: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteKindergardenMutation,
      Exact<{
        id: number;
      }>
    >
  >
) => (
  <Box
    w={["100%", "100%", "100%", "400px", "400px"]}
    rounded={["xs", "sm", "md", "lg", "xl"]}
    p={5}
    style={{
      display: "block",
      width: "1200px",
      overflowY: "hidden",
      overflowX: "auto",
    }}
  >
    <HStack spacing={8} padding="2">
      {data?.showKindergarden?.map((owning) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" shadow="xl">
          <Flex justify="right">
            <IconButton
              aria-label="Delete kindergarden"
              icon={<CloseIcon />}
              variant="ghost"
              onClick={async () => {
                const { error } = await deleteKindergarden({
                  id: owning.Id,
                });
                if (error) {
                  toast({
                    title: t("dashboard.toast.error.title"),
                    description: t("dashboard.toast.error.desc"),
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: t("dashboard.toast.delete.title"),
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }}
            />
          </Flex>
          <Box p="6">
            <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
              <NextLink
                href={"/kindergarden/[id]"}
                as={`/kindergarden/${owning.Id}`}
              >
                <Link
                  color="blue.400"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    useKindergarden({ kindergardenID: owning.Id });
                  }}
                >
                  {owning.Name}
                </Link>
              </NextLink>
            </Box>
            <Divider />
            <Box mt={3}>
              <Text>{owning.Address}</Text>
              <Text>{owning.City}</Text>
              <Text>{owning.Zipcode}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </HStack>
  </Box>
);

const PartOfKindergardenCards = (
  notMine: ({
    __typename?: "KinderGarden";
  } & {
    __typename?: "KinderGarden";
  } & Pick<KinderGarden, "Id" | "Name" | "City" | "Address" | "Zipcode">)[] &
    ({
      __typename?: "KinderGarden";
    } & {
      __typename?: "KinderGarden";
    } & Pick<KinderGarden, "Id" | "Name" | "City" | "Address" | "Zipcode">)[],
  useKindergarden: (
    variables?: Exact<{
      kindergardenID: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UseKindergardenMutation,
      Exact<{
        kindergardenID: number;
      }>
    >
  >
) => (
  <Box
    w={["100%", "100%", "100%", "400px", "400px"]}
    rounded={["xs", "sm", "md", "lg", "xl"]}
    p={5}
    style={{
      display: "block",
      width: "1200px",
      overflowY: "hidden",
      overflowX: "auto",
    }}
  >
    <HStack spacing={8} p="2">
      {notMine.map((owning) => (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" boxShadow="xl">
          <Box p="6">
            <Box mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
              <NextLink
                href={"/kindergarden/[id]"}
                as={`/kindergarden/${owning.Id}`}
              >
                <Link
                  color="blue.400"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    useKindergarden({ kindergardenID: owning.Id });
                  }}
                >
                  {owning.Name}
                </Link>
              </NextLink>
            </Box>
            <Divider />
            <Box mt={3}>
              <Text>{owning.Address}</Text>
              <Text>{owning.City}</Text>
              <Text>{owning.Zipcode}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </HStack>
  </Box>
);

const Dashboard = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const toast = useToast();
  const [, useKindergarden] = useUseKindergardenMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useShowKindergardenQuery();
  const [, createKindergarden] = useCreateKindergardenMutation();
  const [, deleteKindergarden] = useDeleteKindergardenMutation();
  const notMine = fetchPartOf();
  const role = getUserRole();

  if (fetching && !data?.showKindergarden) {
    return <CustomSpinner />;
  } else if (!data?.showKindergarden && !fetching) {
    return (
      <CustomAlert
        name={t("dashboard.alert.title")}
        data={t("dashboard.alert.desc")}
        status={"error"}
      />
    );
  }
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{t("dashboard.main-header")}</title>
      <CustomModal
        onClose={onClose}
        isOpen={isOpen}
        header={t("dashboard.modal-header")}
      >
        {CreateKindergardenForm(toast, t, onClose, createKindergarden)}
      </CustomModal>
      <Flex mt={["10px", "10px", "10px", "0", "0"]} justify={"center"}>
        <Heading color="blue.400">{t("dashboard.main-header")}</Heading>
        {role === "Headmaster" ? (
          <IconButton
            aria-label="Add"
            icon={<AddIcon />}
            bg="blue.400"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            type="submit"
            onClick={onOpen}
            ml={"2rem"}
          />
        ) : null}
      </Flex>
      <Divider mt={5} />
      {data?.showKindergarden.length > 0 ? (
        <Stack spacing={10} mt={10} padding="5">
          <Flex justify={["center", "center", "center", "left", "left"]}>
            <Heading ml={["0", "0", "0", "10rem", "10px"]} color="blue.400">
              {t("dashboard.owned-header")}
            </Heading>
          </Flex>
          <Flex align="center" justify="center" mb={5}>
            {OwnedKindergardenCards(
              data,
              t,
              toast,
              useKindergarden,
              deleteKindergarden
            )}
          </Flex>
        </Stack>
      ) : null}
      {notMine.length > 0 ? (
        <Stack spacing={10} mt={10} p="5">
          <Flex justify={["center", "center", "center", "center", "center"]}>
            <Heading ml={["0", "0", "0", "10px", "10px"]} color="blue.400">
              {t("dashboard.part-header")}
            </Heading>
          </Flex>
          <Flex align="center" justify="left" mb={5}>
            {PartOfKindergardenCards(notMine, useKindergarden)}
          </Flex>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Dashboard);
