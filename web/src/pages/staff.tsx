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
} from "@chakra-ui/react";
import { fetchOwnerOf } from "../utils/fetchOwnerOf";
import { fetchStaff } from "../utils/fetchStaff";
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
  KinderGarden,
  MeQuery,
  SearchUserQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useMeQuery,
  User,
  useSearchUserQuery,
} from "../generated/graphql";
import { ShowUser } from "../components/ShowUser";
import { useIsAuth } from "../utils/useIsAuth";
import { useTranslation, TFunction } from "react-i18next";
import isElectron from "is-electron";
import router from "next/router";
import { CustomModal } from "../components/CustomModal";
import { CustomDrawer } from "../components/CustomDrawer";
import { OperationContext, OperationResult } from "urql";

const AddStaffBody = (
  setText: React.Dispatch<React.SetStateAction<string>>,
  userSearch: SearchUserQuery,
  fetching: boolean,
  t: TFunction<"data">,
  setShow: React.Dispatch<any>,
  openModal: () => void,
  addStaff: (
    variables?: Exact<{
      Id: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      AddStaffMutation,
      Exact<{
        Id: number;
      }>
    >
  >
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
              {u.partof.length <= 0 ? (
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
                        addStaff({ Id: u.Id });
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

const Owner = (t: TFunction<"data">, owner: {}) => (
  <Box>
    <Table>
      <Thead>
        <Tr>
          <Th>{t("staff.tbl-name")}</Th>
          <Th>{t("staff.tbl-surname")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            {
              // @ts-ignore
              owner?.Name
            }
          </Td>
          <Td>
            {
              // @ts-ignore
              owner?.Surname
            }
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
);

const StaffTable = (
  staff: ({
    __typename?: "User";
  } & {
    __typename?: "User";
  } & Pick<
      User,
      "Id" | "Name" | "Surname" | "Email" | "Role" | "createdAt" | "updatedAt"
    > & {
      partof?: ({
        __typename?: "KinderGarden";
      } & {
        __typename?: "KinderGarden";
      } & Pick<KinderGarden, "Id" | "Name" | "City" | "Address" | "Zipcode">)[];
    })[],
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
  owner: {}
) => (
  <Box>
    <Table>
      <Thead>
        <Tr>
          <Th>{t("staff.tbl-name")}</Th>
          <Th>{t("staff.tbl-surname")}</Th>
          <Th>{t("staff.tbl-role")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {staff?.map((s) => (
          <Tr>
            <Td>{s.Name}</Td>
            <Td>{s.Surname}</Td>
            <Td>{translatedRoles(s.Role)}</Td>
            <Td>
              {
                // @ts-ignore
                meData?.me.Name === owner.Name &&
                // @ts-ignore
                meData?.me.Surname === owner.Surname &&
                // @ts-ignore
                meData?.me?.Id === owner.Id ? (
                  <IconButton
                    aria-label="Delete from staff"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      deleteStaff({
                        userId: s.Id,
                      });
                    }}
                  />
                ) : null
              }
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

const Staff: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: modalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const owner = fetchOwnerOf();
  const staff = fetchStaff();
  const [, addStaff] = useAddStaffMutation();
  const [, deleteStaff] = useDeleteStaffMutation();
  const [text, setText] = useState("");
  const [show, setShow] = useState(null);
  const [{ data: userSearch, fetching }] = useSearchUserQuery({
    variables: {
      text,
    },
  });
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

  return (
    <Layout variant={"column"} navbarVariant={"user"}>
      <title>{t("staff.main-header")}</title>
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
          addStaff
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
          <Heading color="blue.400">{t("staff.owner-heading")}</Heading>
        </Flex>
        {Owner(t, owner)}
        <Flex
          justify={["center", "center", "center", "left", "left"]}
          mt={20}
          mb={2}
        >
          <Heading color="blue.400">{t("staff.staff-heading")}</Heading>
          {
            // @ts-ignore
            meData?.me?.Name === owner.Name &&
            // @ts-ignore
            meData?.me?.Surname === owner.Surname &&
            // @ts-ignore
            meData?.me?.Id === owner.Id ? (
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
            ) : null
          }
        </Flex>
        {StaffTable(staff, translatedRoles, t, deleteStaff, meData, owner)}
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Staff);
