import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  useDisclosure,
  IconButton,
  Spinner,
  InputLeftElement,
  InputGroup,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { fetchOwnerOf } from "../utils/fetchOwnerOf";
import {
  AddIcon,
  ArrowBackIcon,
  DeleteIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  AddStaffMutation,
  DeleteStaffMutation,
  Exact,
  MeQuery,
  SearchUserQuery,
  ShowStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useMeQuery,
  useOwnerQuery,
  useSearchUserQuery,
  useShowStaffQuery,
} from "../generated/graphql";
import { ShowUser } from "../components/ShowUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation, TFunction } from "react-i18next";
import isElectron from "is-electron";
import router from "next/router";
import { CustomModal } from "../components/CustomModal";
import { CustomDrawer } from "../components/CustomDrawer";
import { OperationContext, OperationResult } from "urql";
import { OwnerType } from "../utils/types";
import { Form, Formik } from "formik";
import { toErrormap } from "../utils/toErrorMap";

const AddStaffBody = (
  setText: React.Dispatch<React.SetStateAction<string>>,
  userSearch: SearchUserQuery,
  fetching: boolean,
  t: TFunction<"data">,
  setShow: React.Dispatch<any>,
  openModal: () => void,
  addStaffModalOnOpen: () => void,
  setUserId: React.Dispatch<any>
) => (
  <>
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        style={{ borderRadius: "12px" }}
        placeholder={t("staff.drawer.placeholder")}
        id="text"
        onChange={() => {
          // @ts-ignore
          setText(document.getElementById("text").value);
        }}
      />
    </InputGroup>
    <Table mt={5}>
      <Tbody>
        {!userSearch?.searchUser && fetching ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          userSearch?.searchUser.map((u) => (
            <Tr>
              {u.staffOf.length <= 0 ? (
                <>
                  <Td>{u.Name}</Td>
                  <Td>{u.Surname}</Td>
                  <Td>
                    <IconButton
                      aria-label="Add to staff"
                      icon={<AddIcon />}
                      color="white"
                      bg="blue.400"
                      _hover={{
                        backgroundColor: "#719ABC",
                      }}
                      onClick={() => {
                        setUserId(u.Id);
                        addStaffModalOnOpen();
                      }}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="View user"
                      icon={<ViewIcon />}
                      color="white"
                      bg="blue.400"
                      _hover={{
                        backgroundColor: "#719ABC",
                      }}
                      onClick={() => {
                        setShow(u);
                        openModal();
                      }}
                    />
                  </Td>
                </>
              ) : null}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  </>
);

const StaffTable = (
  staff: ShowStaffQuery,
  translatedRoles: (role: String) => string,
  t: TFunction<"data">,
  deleteStaff: (
    variables?: Exact<{
      userId: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteStaffMutation,
      Exact<{
        userId: number;
      }>
    >
  >,
  meData: MeQuery,
  owner: OwnerType
) => (
  <Box>
    <Table>
      <Thead>
        <Tr>
          <Th>{t("staff.tbl-name")}</Th>
          <Th>{t("staff.tbl-surname")}</Th>
          <Th>{t("staff.tbl-role")}</Th>
          <Td></Td>
        </Tr>
      </Thead>
      <Tbody>
        {staff?.showStaff?.map((s) => (
          <Tr>
            <Td>{s.staff.Name}</Td>
            <Td>{s.staff.Surname}</Td>
            <Td>{translatedRoles(s.role)}</Td>
            <Td>
              {meData?.me?.Id === owner?.Id ? (
                <IconButton
                  aria-label="Delete from staff"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => {
                    deleteStaff({
                      userId: s.staffId,
                    });
                  }}
                />
              ) : null}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

const AddStaffForm = (
  addStaff: (
    variables?: Exact<{
      role: string;
      userId: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      AddStaffMutation,
      Exact<{
        role: string;
        userId: number;
      }>
    >
  >,
  t: TFunction<"data">,
  userId: any,
  toast,
  addStaffModalOnClose: () => void
) => {
  const [role, setRole] = useState("");
  const handleChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <Formik
      initialValues={{
        role: "",
      }}
      onSubmit={async (_, { setErrors }) => {
        const response = await addStaff({
          userId,
          role,
        });

        if (response.data.addStaff.errors) {
          setErrors(toErrormap(response.data.addStaff.errors));
        } else if (response.data.addStaff.staff) {
          addStaffModalOnClose();
          toast({
            title: t("staff.result.success"),
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex justifyContent="center" flexDirection="column">
            <Stack spacing={4}>
              <Select
                variant="filled"
                placeholder={t("register.form.placeholders.role")}
                onChange={handleChange}
                borderRadius="24px"
              >
                <option value="Teacher">{t("staff.roles.teacher")}</option>
                <option value="Pedagogue">{t("staff.roles.pedagogue")}</option>
              </Select>
              <Button
                bg="blue.400"
                className="nav-item"
                colorScheme="navItem"
                borderRadius="12px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                isLoading={isSubmitting}
                type="submit"
              >
                {t("staff.btn-add")}
              </Button>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

const Staff: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const {
    isOpen: addStaffModalIsOpen,
    onOpen: addStaffModalOnOpen,
    onClose: addStaffModalOnClose,
  } = useDisclosure();
  const [{ data: owner }] = useOwnerQuery();
  console.log(owner);
  const [{ data: staff }] = useShowStaffQuery();
  const [, addStaff] = useAddStaffMutation();
  const [, deleteStaff] = useDeleteStaffMutation();
  const [text, setText] = useState("");
  const [show, setShow] = useState(null);
  const [{ data: userSearch, fetching }] = useSearchUserQuery({
    variables: {
      text,
    },
  });
  const [userId, setUserId] = useState(null);
  const [{ data: meData }] = useMeQuery();
  const translatedRoles = (role: String) => {
    switch (role) {
      case "Headmaster":
        return t("staff.roles.headmaster");

      case "Teacher":
        return t("staff.roles.teacher");

      case "Pedagogue":
        return t("staff.roles.pedagogue");
    }
  };
  const toast = useToast();
  console.log("Owner", owner);
  console.log("ME", meData);

  return (
    <Layout variant={"column"} navbarVariant={"user"}>
      <title>{t("staff.main-header")}</title>
      <CustomModal
        header={t("staff.btn-add")}
        isOpen={addStaffModalIsOpen}
        onClose={addStaffModalOnClose}
      >
        {AddStaffForm(addStaff, t, userId, toast, addStaffModalOnClose)}
      </CustomModal>
      <CustomModal
        header={t("staff.modal.header")}
        isOpen={modalOpen}
        onClose={closeModal}
      >
        <Box
          width={{ base: "90%", md: "400px" }}
          rounded="lg"
          p={5}
          border={"1px"}
          borderColor="blue.400"
          borderRadius={"12px"}
          mb="2"
        >
          <Stack spacing={4}>
            <ShowUser title={t("staff.modal.data.name")} data={show?.Name} />
            <ShowUser
              title={t("staff.modal.data.surname")}
              data={show?.Surname}
            />
            <ShowUser title={t("staff.modal.data.email")} data={show?.Email} />
          </Stack>
        </Box>
      </CustomModal>
      <CustomDrawer
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        header={t("staff.drawer.header")}
      >
        {AddStaffBody(
          setText,
          userSearch,
          fetching,
          t,
          setShow,
          openModal,
          addStaffModalOnOpen,
          setUserId
        )}
      </CustomDrawer>
      <Stack spacing={8}>
        <Flex
          justify={["center", "center", "center", "left", "left"]}
          mt={5}
          mb={2}
        >
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
        </Flex>
        <Flex
          justify={["center", "center", "center", "left", "left"]}
          mt={20}
          mb={2}
        >
          <Heading color="blue.400">{t("staff.staff-heading")}</Heading>
          {meData?.me?.Id === owner?.owner?.owning.Id ? (
            <IconButton
              ml={5}
              bg="blue.400"
              colorScheme="navItem"
              borderRadius="12px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              type="submit"
              onClick={onOpen}
              icon={<AddIcon />}
              aria-label={"Add staff"}
            />
          ) : null}
        </Flex>
        {StaffTable(
          staff,
          translatedRoles,
          t,
          deleteStaff,
          meData,
          owner?.owner?.owning
        )}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Staff);
