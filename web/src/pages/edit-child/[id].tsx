import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import {
  Flex,
  Box,
  Stack,
  Button,
  useToast,
  Spinner,
  HStack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  UseToastOptions,
  Thead,
  Th,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useIsAuth } from "../../utils/useIsAuth";
import { useGetId } from "../../utils/getID";
import {
  ChildrenInput,
  Exact,
  FilterFatherQuery,
  FilterMotherQuery,
  FindChildQuery,
  UpdateChildMutation,
  UpdateChildrenParentsMutation,
  useFilterFatherQuery,
  useFilterMotherQuery,
  useFindChildQuery,
  useUpdateChildMutation,
  useUpdateChildrenParentsMutation,
} from "../../generated/graphql";
import { AddIcon, ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { ParentCard } from "../../components/ParentCard";
import { useTranslation, TFunction } from "react-i18next";
import { CustomSpinner } from "../../components/Spinner";
import { CustomAlert } from "../../components/Alerts";
import { OperationContext, OperationResult } from "urql";
import { NextRouter } from "next/router";
import moment from "moment";

const UpdateChildForm = (
  data: FindChildQuery,
  updateChild: (
    variables?: Exact<{
      kidId: number;
      options: ChildrenInput;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateChildMutation,
      Exact<{
        kidId: number;
        options: ChildrenInput;
      }>
    >
  >,
  toast: (options?: UseToastOptions) => string | number,
  router: NextRouter,
  id: number,
  t: TFunction<"data">
) => (
  <Formik
    initialValues={{
      name: data.findChild.Name,
      surname: data.findChild.Surname,
      gender: data.findChild.Gender,
      birthdate: moment(new Date(data.findChild.BirthDate)).format(
        "yyyy-MM-DD"
      ),
      oib: data.findChild.OIB.toString(),
      remarks: data.findChild.Remarks,
    }}
    onSubmit={async (values) => {
      const { error } = await updateChild({
        kidId: id,
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
          title: t("edit-child.toast.title"),
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
            placeholder={t("edit-child.form.placeholders.name")}
            label={t("edit-child.form.name")}
            type="text"
            required
          />
          <InputField
            name="surname"
            placeholder={t("edit-child.form.placeholders.surname")}
            label={t("edit-child.form.surname")}
            type="text"
            required
          />
          <InputField
            name="gender"
            placeholder={t("edit-child.form.placeholders.gender")}
            label={t("edit-child.form.gender")}
            type="text"
            required
          />
          <InputField
            name="birthdate"
            placeholder={t("edit-child.form.placeholders.birth-date")}
            label={t("edit-child.form.birth-date")}
            type="string"
            required
          />
          <InputField
            name="oib"
            placeholder={t("edit-child.form.placeholders.pin")}
            label={t("edit-child.form.pin")}
            type="text"
            required
          />
          <InputField
            name="remarks"
            placeholder={t("edit-child.form.placeholders.remarks")}
            label={t("edit-child.form.remarks")}
            textArea
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
                    {data.findChild.createdBy.Name +
                      " " +
                      data.findChild.createdBy.Surname}
                  </Td>
                  <Td>
                    {moment(data.findChild.createdAt).format("DD-MM-yyyy")}
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
                    {data.findChild.updatedBy.Name +
                      " " +
                      data.findChild.updatedBy.Surname}
                  </Td>
                  <Td>
                    {moment(data.findChild.updatedAt).format("DD-MM-yyyy")}
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
            {t("edit-child.form.btn")}
          </Button>
        </Stack>
      </Form>
    )}
  </Formik>
);

const MotherDataTable = (
  data: FindChildQuery,
  motherFetching: boolean,
  mother: FilterMotherQuery,
  t: TFunction<"data">,
  updateParents: (
    variables?: Exact<{
      childId: number;
      motherId?: number;
      fatherId?: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateChildrenParentsMutation,
      Exact<{
        childId: number;
        motherId?: number;
        fatherId?: number;
      }>
    >
  >
) => (
  <>
    <Heading mt={5} color="blue.400">
      {t("edit-child.drawer.tbl-mother")}
    </Heading>
    <Table mt={5}>
      <Tbody>
        {!mother && motherFetching ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}
        {mother?.filterMother.map((m) => (
          <Tr>
            <Td>{m.Name}</Td>
            <Td>{m.Surname}</Td>
            <Td>
              <IconButton
                aria-label="Add to group"
                icon={<AddIcon />}
                color="white"
                bg="blue.400"
                _hover={{
                  backgroundColor: "#719ABC",
                }}
                onClick={() => {
                  updateParents({
                    childId: data.findChild.Id,
                    motherId: m.Id,
                    fatherId: data.findChild.fatherId,
                  });
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </>
);

const FatherDataTable = (
  data: FindChildQuery,
  fatherFetching: boolean,
  father: FilterFatherQuery,
  t: TFunction<"data">,
  updateParents: (
    variables?: Exact<{
      childId: number;
      motherId?: number;
      fatherId?: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateChildrenParentsMutation,
      Exact<{
        childId: number;
        motherId?: number;
        fatherId?: number;
      }>
    >
  >
) => (
  <>
    <Heading mt={5} color="blue.400">
      {t("edit-child.drawer.tbl-father")}
    </Heading>
    <Table mt={5}>
      <Tbody>
        {!father && fatherFetching ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}
        {father?.filterFather.map((f) => (
          <Tr>
            <Td>{f.Name}</Td>
            <Td>{f.Surname}</Td>
            <Td>
              <IconButton
                aria-label="Add parents"
                icon={<AddIcon />}
                color="white"
                bg="blue.400"
                _hover={{
                  backgroundColor: "#719ABC",
                }}
                onClick={() => {
                  updateParents({
                    childId: data.findChild.Id,
                    motherId: data.findChild.motherId,
                    fatherId: f.Id,
                  });
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </>
);

const AddParentsDrawer = (
  isOpen: boolean,
  onClose: () => void,
  t: TFunction<"data">,
  data: FindChildQuery,
  mother: FilterMotherQuery,
  motherFetching: boolean,
  father: FilterFatherQuery,
  fatherFetching: boolean,
  updateParents: (
    variables?: Exact<{
      childId: number;
      motherId?: number;
      fatherId?: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      UpdateChildrenParentsMutation,
      Exact<{
        childId: number;
        motherId?: number;
        fatherId?: number;
      }>
    >
  >,
  setText: (value: React.SetStateAction<string>) => void
) => (
  <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"md"}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t("edit-child.drawer.header")}</DrawerHeader>
        <DrawerBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              style={{ borderRadius: "12px" }}
              placeholder={t("edit-child.drawer.placeholder")}
              id="text"
              onChange={() => {
                // @ts-ignore
                setText(document.getElementById("text").value);
              }}
            />
          </InputGroup>
          {data.findChild.motherId
            ? null
            : MotherDataTable(data, motherFetching, mother, t, updateParents)}
          {data.findChild.fatherId
            ? null
            : FatherDataTable(data, fatherFetching, father, t, updateParents)}
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

const EditChild = ({}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  const id = useGetId();
  const toast = useToast();
  const router = useRouter();
  useIsAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");

  const [{ data: mother, fetching: motherFetching }] = useFilterMotherQuery({
    variables: {
      text,
    },
  });
  const [{ data: father, fetching: fatherFetching }] = useFilterFatherQuery({
    variables: {
      text,
    },
  });
  const [{ data, fetching }] = useFindChildQuery({
    pause: id === -1,
    variables: {
      id,
    },
  });

  const [, updateChild] = useUpdateChildMutation();
  const [, updateParents] = useUpdateChildrenParentsMutation();

  console.log(data);

  if (fetching) {
    return <CustomSpinner />;
  } else if (!data?.findChild) {
    return (
      <CustomAlert
        name={t("edit-child.alert.title")}
        data={t("edit-child.alert.desc")}
        status={"error"}
      />
    );
  }

  return (
    <Layout variant="column" navbarVariant="user">
      <title>{data.findChild.Name + " " + data.findChild.Surname}</title>
      {AddParentsDrawer(
        isOpen,
        onClose,
        t,
        data,
        mother,
        motherFetching,
        father,
        fatherFetching,
        updateParents,
        setText
      )}
      <Flex justify={["center", "center", "center", "center", "left"]}>
        <HStack spacing={5} mb={10}>
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
          <Heading color="blue.400">{t("edit-child.main-header")}</Heading>
        </HStack>
      </Flex>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        // @ts-ignore
        wrap="no-wrap"
        minH="70vh"
        px={8}
        mb={5}
      >
        <Box width={{ base: "90%", md: "400px" }} rounded="lg">
          {UpdateChildForm(data, updateChild, toast, router, id, t)}
        </Box>
        <Box
          width={{ base: "90%", md: "400px" }}
          rounded="lg"
          ml={[0, 0, "30px", 0, 0]}
        >
          {!data.findChild.motherId || !data.findChild.fatherId ? (
            <>
              <Button
                leftIcon={<AddIcon />}
                bg="blue.400"
                colorScheme="navItem"
                borderRadius="12px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                onClick={onOpen}
              >
                {t("edit-child.btn-add-parents")}
              </Button>
            </>
          ) : (
            <>
              <ParentCard
                child={data.findChild}
                parent="mother"
                layout={true}
                data={data.findChild.mother}
              />
              <ParentCard
                child={data.findChild}
                parent="father"
                layout={true}
                data={data.findChild.father}
              />
            </>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditChild);
