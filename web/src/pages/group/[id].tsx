import React, { useState } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import {
  Stack,
  Flex,
  HStack,
  Button,
  Box,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Tr,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useDisclosure,
  Link,
  Divider,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  AddChildToGroupMutation,
  ClearGroupMutation,
  Exact,
  ShowChildrenFilterInGroupQuery,
  ShowChildrenQuery,
  useAddChildToGroupMutation,
  useClearGroupMutation,
  useDeleteChildrenMutation,
  useRemoveChildFromGroupMutation,
  useShowChildrenFilterInGroupQuery,
  useShowChildrenQuery,
  useShowSelectedKindergardenQuery,
} from "../../generated/graphql";
import { fetchGroup } from "../../utils/fetchGroup";
import { useIsAuth } from "../../utils/useIsAuth";
import NextLink from "next/link";
import { SearchIcon, AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { TFunction, useTranslation } from "react-i18next";
import { getUserRole } from "../../utils/getUserRole";
import { ChildrenModal } from "../../components/ChildrenModal";
import isElectron from "is-electron";
import { NextRouter } from "next/router";
import { OperationContext, OperationResult } from "@urql/core";
import { CustomDrawer } from "../../components/CustomDrawer";
import { InGroupTable } from "../../components/InGroupTable";
import { checkRole } from "../../utils/checkRole";
import { fetchPartOf } from "../../utils/fetchPartof";

const MenuDrawer = (
  isOpenMenu: boolean,
  onCloseMenu: () => void,
  onOpen: () => void,
  router: NextRouter,
  t: TFunction<"data">,
  clearGroup: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      ClearGroupMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >
) => (
  <CustomDrawer isOpen={isOpenMenu} onClose={onCloseMenu}>
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between"]}
      direction={["column", "column", "column"]}
      pt={[4, 4, 0, 0]}
    >
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
          onCloseMenu();
          onOpen();
        }}
      >
        {t("group.btn-add")}
      </Button>
      <NextLink
        href={"/kindergarden/[id]"}
        as={`/kindergarden/${
          typeof router.query.id === "string" ? router.query.id : ""
        }`}
      >
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
            clearGroup();
          }}
        >
          {t("group.btn-return")}
        </Button>
      </NextLink>
    </Stack>
  </CustomDrawer>
);

const AddGroupDrawer = (
  setText: React.Dispatch<React.SetStateAction<string>>,
  isOpen: boolean,
  onClose: () => void,
  children: ShowChildrenQuery,
  fetchingChildren: boolean,
  t: TFunction<"data">,
  addChildToGroup: (
    variables?: Exact<{
      id: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      AddChildToGroupMutation,
      Exact<{
        id: number;
      }>
    >
  >
) => (
  <CustomDrawer
    isOpen={isOpen}
    onClose={onClose}
    header={t("group.drawer.header")}
    size="md"
  >
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input
        style={{ borderRadius: "12px" }}
        placeholder={t("group.drawer.placeholder")}
        id="text"
        onChange={() => {
          // @ts-ignore
          setText(document.getElementById("text").value);
        }}
      />
    </InputGroup>
    <Table mt={5}>
      <Tbody>
        {!children && fetchingChildren ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : null}
        {children?.showChildren.map((c) => (
          <Tr>
            <Td>{c.Name}</Td>
            <Td>{c.Surname}</Td>
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
                  addChildToGroup({
                    id: c.Id,
                  });
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </CustomDrawer>
);

const Menu = (
  role: string,
  onOpen: () => void,
  t: TFunction<"data">,
  router: NextRouter,
  clearGroup: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      ClearGroupMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >,
  electron: boolean
) => {
  switch (electron) {
    case false:
      return (
        <>
          {checkRole(role, "Headmaster") || checkRole(role, "Pedagouge") ? (
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
              display={["none", "none", "none", "flex"]}
            >
              {t("group.btn-add")}
            </Button>
          ) : null}
        </>
      );
    case true:
      return (
        <>
          {checkRole(role, "Headmaster") || checkRole(role, "Pedagouge") ? (
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
              {t("group.btn-add")}
            </Button>
          ) : null}
          <Button
            bg="blue.400"
            className="nav-item"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            display={["flex", "flex", "flex", "none"]}
            onClick={async () => {
              await clearGroup();
              router.push(
                `/kindergarden/${
                  typeof router.query.id === "string" ? router.query.id : ""
                }`
              );
            }}
          >
            {t("group.btn-return")}
          </Button>
        </>
      );
  }
};

const HasMoreBtn = (
  setVariables: (
    value: React.SetStateAction<{
      limit: number;
      cursor: string;
    }>
  ) => void,
  variables: {
    limit: number;
    cursor: string;
  },
  data: ShowChildrenFilterInGroupQuery,
  fetching: boolean,
  t: TFunction<"data">
) => (
  <Flex>
    <Button
      onClick={() => {
        setVariables({
          limit: variables.limit,
          cursor:
            data.showChildrenFilterInGroup.children[
              data.showChildrenFilterInGroup.children.length - 1
            ].createdAt,
        });
      }}
      isLoading={fetching}
      m="auto"
      my={8}
      bg="blue.400"
      colorScheme="navItem"
      borderRadius="12px"
      py="4"
      px="4"
      lineHeight="1"
      size="md"
    >
      {t("children.btn-load-more")}
    </Button>
  </Flex>
);

const Group = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [text, setText] = useState("");
  const router = useRouter();
  const [, clearGroup] = useClearGroupMutation();
  const groupName = fetchGroup();
  const [, addChildToGroup] = useAddChildToGroupMutation();
  const [{ data, fetching }] = useShowChildrenFilterInGroupQuery({
    variables,
  });
  const [, removeFromGroup] = useRemoveChildFromGroupMutation();
  const [, deleteChildren] = useDeleteChildrenMutation();
  const [{ data: children, fetching: fetchingChildren }] = useShowChildrenQuery(
    {
      variables: { text },
    }
  );
  const {
    isOpen: teacherChildViewIsOpen,
    onOpen: teacherChildViewOnOpen,
    onClose: teacherChildViewOnClose,
  } = useDisclosure();
  const [child, setChild] = useState(null);
  const [{ data: selectedKindergarden }] = useShowSelectedKindergardenQuery();
  const partOf = fetchPartOf();
  const extractRole = (): string => {
    for (let i = 0; i < partOf.length; i++) {
      if (
        partOf[i].kindergarden.Id ===
        selectedKindergarden.selectedKindergarden.Id
      )
        return partOf[i].role;
    }
    return "Headmaster";
  };
  const [childrenFilter, setChildrenFilter] = useState("");
  return (
    <Layout navbarVariant={"user"} variant={"column"}>
      <title>{groupName}</title>
      {checkRole(extractRole(), "Teacher") ? (
        <ChildrenModal
          onClose={teacherChildViewOnClose}
          isOpen={teacherChildViewIsOpen}
          child={child}
        />
      ) : null}
      {checkRole(extractRole(), "Headmaster") ||
      checkRole(extractRole(), "Pedagouge") ? (
        <>
          {AddGroupDrawer(
            setText,
            isOpen,
            onClose,
            children,
            fetchingChildren,
            t,
            addChildToGroup
          )}
          {MenuDrawer(
            isOpenMenu,
            onCloseMenu,
            onOpenMenu,
            router,
            t,
            clearGroup
          )}
        </>
      ) : null}
      <Stack spacing={5}>
        <Flex align="center" justify="center" mt={5} p={3}>
          <HStack p={2} spacing={4}>
            {Menu(extractRole(), onOpen, t, router, clearGroup, isElectron())}
            {!isElectron() ? (
              <IconButton
                display={["flex", "flex", "flex", "none"]}
                colorScheme="navItem"
                color="white"
                bg="blue.400"
                borderRadius={"12px"}
                className="menu-btn"
                aria-label="Open menu"
                onClick={onOpenMenu}
                icon={<HamburgerIcon />}
              />
            ) : null}
          </HStack>
        </Flex>
      </Stack>
      <Divider mt={5} />
      <Box
        w={["100%", "100%", "100%", "100%", "100%"]}
        display={["block", "block", "block", "block"]}
        overflowX={["auto", "auto", "hidden", "hidden"]}
      >
        {fetching && !data ? (
          <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <>
            <Flex mt="5">
              <InputGroup mt="2" flex="1" justifySelf="center">
                <InputLeftAddon borderRadius="48px" children="Filter child" />
                <Input
                  borderRadius="48px"
                  name="search"
                  id="search"
                  type="text"
                  placeholder="Input name..."
                  onChange={(e) => {
                    setChildrenFilter(e.currentTarget.value);
                  }}
                />
              </InputGroup>
            </Flex>
            <InGroupTable
              removeFromGroup={removeFromGroup}
              childrenFilter={childrenFilter}
              data={data}
              deleteChildren={deleteChildren}
              onOpen={teacherChildViewOnOpen}
              role={extractRole()}
              setChild={setChild}
            />
          </>
        )}
        {data && data.showChildrenFilterInGroup.hasMore
          ? HasMoreBtn(setVariables, variables, data, fetchingChildren, t)
          : null}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Group);
