import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import {
  CreateGroupMutation,
  Exact,
  UseChildrenMutation,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useShowGroupsQuery,
  useShowSelectedKindergardenQuery,
  useUseChildrenMutation,
  useUseGroupMutation,
} from "../../generated/graphql";
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { toErrormap } from "../../utils/toErrorMap";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useTranslation, TFunction } from "react-i18next";
import { useIsAuth } from "../../utils/useIsAuth";
import { CustomSpinner } from "../../components/Spinner";
import { CustomAlert } from "../../components/Alerts";
import isElectron from "is-electron";
import { OperationContext, OperationResult } from "urql";
import { GroupCard } from "../../components/GroupCard";
import { CustomModal } from "../../components/CustomModal";
import { CustomDrawer } from "../../components/CustomDrawer";
import { fetchPartOf } from "../../utils/fetchPartof";
import { extractRole } from "../../utils/extractRole";
import { useGetId } from "../../utils/getID";

const DrawerMenu = (
  t: TFunction<"translation">,
  useChildren: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UseChildrenMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >
) => (
  <Stack
    spacing={8}
    align="center"
    justify={["center", "space-between"]}
    direction={["column", "column", "column"]}
    pt={[4, 4, 0, 0]}
  >
    <NextLink href="/children">
      <Button
        as={Link}
        color="blue.400"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        onClick={() => {
          useChildren();
        }}
      >
        {t("kindergarden.toolbox.btn-children")}
      </Button>
    </NextLink>
    <NextLink href="/parents">
      <Button
        as={Link}
        color="blue.400"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
      >
        {t("kindergarden.toolbox.btn-parents")}
      </Button>
    </NextLink>
    <NextLink href="/staff">
      <Button
        as={Link}
        color="blue.400"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
      >
        {t("kindergarden.toolbox.btn-staff")}
      </Button>
    </NextLink>
  </Stack>
);

const DrawerMenuHeader = () => (
  <Heading
    fontSize="xl"
    fontWeight="500"
    color="blue.400"
    style={{ fontWeight: "bold", textTransform: "uppercase" }}
  >
    Kindie
  </Heading>
);

const CreateGroupForm = (
  toast: (options?: UseToastOptions) => string | number,
  t: TFunction<"translation">,
  onClose: () => void,
  createGroup: (
    variables?: Exact<{
      name: string;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      CreateGroupMutation,
      Exact<{
        name: string;
      }>
    >
  >
) => (
  <Formik
    initialValues={{ name: "" }}
    onSubmit={async (values, { setErrors }) => {
      const response = await createGroup({
        name: values.name,
      });
      if (response.data.createGroup.errors) {
        setErrors(toErrormap(response.data.createGroup.errors));
      } else {
        toast({
          title: t("kindergarden.toast.create.title"),
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
            placeholder={t("kindergarden.form.placeholders.name")}
            label={t("kindergarden.form.name")}
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
            {t("kindergarden.form.btn")}
          </Button>
        </Flex>
      </Form>
    )}
  </Formik>
);

const MainMenu = (
  role: string,
  onOpen: () => void,
  t: TFunction<"translation">,
  drawerOnOpen: () => void,
  useChildren: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UseChildrenMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >
) => (
  <HStack p={1} spacing={4}>
    {role === "Headmaster" || role === "Pedagogue" ? (
      <Button
        bg="blue.400"
        className="nav-item"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        onClick={onOpen}
        display={!isElectron() ? ["none", "none", "none", "flex"] : "flex"}
      >
        {t("kindergarden.toolbox.btn-new-group")}
      </Button>
    ) : null}
    <NextLink href={"/children"}>
      <Button
        bg="blue.400"
        className="nav-item"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        display={!isElectron() ? ["none", "none", "none", "flex"] : "flex"}
        onClick={async () => {
          await useChildren();
        }}
      >
        {t("kindergarden.toolbox.btn-children")}
      </Button>
    </NextLink>
    <NextLink href="/parents">
      <Button
        bg="blue.400"
        className="nav-item"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        display={!isElectron() ? ["none", "none", "none", "flex"] : "flex"}
      >
        {t("kindergarden.toolbox.btn-parents")}
      </Button>
    </NextLink>
    <NextLink href="/staff">
      <Button
        bg="blue.400"
        className="nav-item"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        display={!isElectron() ? ["none", "none", "none", "flex"] : "flex"}
      >
        {t("kindergarden.toolbox.btn-staff")}
      </Button>
    </NextLink>
    {role === "Headmaster" || role === "Pedagogue" ? (
      <Button
        bg="blue.400"
        className="nav-item"
        colorScheme="navItem"
        borderRadius="12px"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        onClick={onOpen}
        display={["flex", "flex", "flex", "none"]}
      >
        {t("kindergarden.toolbox.btn-new-group")}
      </Button>
    ) : null}
    {!isElectron() ? (
      <IconButton
        display={["flex", "flex", "flex", "none"]}
        colorScheme="navItem"
        color="white"
        bg="blue.400"
        borderRadius={"12px"}
        className="menu-btn"
        aria-label="Open menu"
        onClick={drawerOnOpen}
        icon={<HamburgerIcon />}
      />
    ) : null}
  </HStack>
);

const Kindergarden = ({}) => {
  useIsAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const [{ data, fetching }] = useShowGroupsQuery();
  const [, createGroup] = useCreateGroupMutation();
  const [, useGroup] = useUseGroupMutation();
  const [, useChildren] = useUseChildrenMutation();
  const [, deleteGroup] = useDeleteGroupMutation();
  const partOf = fetchPartOf();
  const id = useGetId();
  if (fetching) {
    return <CustomSpinner />;
  } else if (!fetching && !data?.showGroups) {
    return (
      <CustomAlert
        status={"error"}
        name={t("kindergarden.alert.title")}
        data={t("kindergarden.alert.desc")}
      />
    );
  }
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{t("kindergarden.main-header")}</title>
      {!isElectron() ? (
        <CustomDrawer
          isOpen={drawerIsOpen}
          onClose={drawerOnClose}
          header={DrawerMenuHeader}
        >
          {DrawerMenu(t, useChildren)}
        </CustomDrawer>
      ) : null}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        header={t("kindergarden.modal.header")}
      >
        {CreateGroupForm(toast, t, onClose, createGroup)}
      </CustomModal>
      <Stack spacing={8}>
        <Flex align="center" justify="center" mt={5} p={5}>
          {MainMenu(
            extractRole(partOf, null, id),
            onOpen,
            t,
            drawerOnOpen,
            useChildren
          )}
        </Flex>
        {data?.showGroups.length > 0 ? (
          <GroupCard
            data={data}
            deleteGroup={deleteGroup}
            role={extractRole(partOf, null, id)}
            useGroup={useGroup}
          />
        ) : null}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Kindergarden);
