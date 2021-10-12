import {
  ViewIcon,
  EditIcon,
  DeleteIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tr,
  Th,
  Button,
  Tbody,
  Td,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { OperationContext, OperationResult } from "@urql/core";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShowChildrenNotIngroupQuery,
  Exact,
  DeleteChildrenMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { ChildrennotinGrouptype } from "../utils/types";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ChildrenDataTableProps {
  data: ShowChildrenNotIngroupQuery;
  role: string;
  setChild: (value: any) => void;
  onOpen: () => void;
  deleteChildren: (
    variables?: Exact<{
      id: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteChildrenMutation,
      Exact<{
        id: number;
      }>
    >
  >;
  childrenFilter: string;
}

const useSortableData = (items: ChildrennotinGrouptype, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const findChild = (data: ShowChildrenNotIngroupQuery, filter: string) => {
  let filterdChild = data?.showChildrenFilterNotInGroup.children.filter(
    (child) => child.Name === filter
  );
  return filterdChild;
};

export const ChildrenDataTable: React.FC<ChildrenDataTableProps> = ({
  data,
  role,
  setChild,
  onOpen,
  deleteChildren,
  childrenFilter,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });

  const { items, requestSort, sortConfig } = useSortableData(
    data!.showChildrenFilterNotInGroup?.children
  );
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    if (sortConfig.key === name) {
      switch (sortConfig.direction) {
        case "ascending":
          return (
            <FontAwesomeIcon style={{ marginLeft: "12px" }} icon={faAngleUp} />
          );
        case "descending":
          return (
            <FontAwesomeIcon
              style={{ marginLeft: "12px" }}
              icon={faAngleDown}
            />
          );
      }
    }
  };

  return (
    <Table mt={"2rem"}>
      {items.length > 0 ? (
        <Thead>
          <Tr>
            <Th>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _selected={{ bg: "transparent" }}
                onClick={() => requestSort("Name")}
              >
                {t("children.tbl-name")}
                {getClassNamesFor("Name")}
              </Button>
            </Th>
            <Th>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _selected={{ bg: "transparent" }}
                onClick={() => requestSort("Surname")}
              >
                {t("children.tbl-surname")}
                {getClassNamesFor("Surname")}
              </Button>
            </Th>
            <Th>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _selected={{ bg: "transparent" }}
                onClick={() => requestSort("createdAt")}
              >
                {t("children.tbl-date")}
                {getClassNamesFor("createdAt")}
              </Button>
            </Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
      ) : null}
      <Tbody>
        {!childrenFilter
          ? items.map((child) =>
              !child ? null : (
                <Tr>
                  <Td>{child.Name}</Td>
                  <Td ml={"2rem"}>{child.Surname}</Td>
                  {role == "Teacher" ? (
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
                          setChild(child);
                          onOpen();
                        }}
                      />
                    </Td>
                  ) : null}
                  <Td>{moment(child.createdAt).format("DD-MM-yyyy")}</Td>
                  <Td>
                    {role == "Pedagogue" || role == "Headmaster" ? (
                      <NextLink
                        href={"/edit-child/[id]"}
                        as={`/edit-child/${child.Id}`}
                      >
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          bg="blue.400"
                          colorScheme="navItem"
                          borderRadius="12px"
                          py="4"
                          px="4"
                          lineHeight="1"
                          size="md"
                          ml={"2rem"}
                        />
                      </NextLink>
                    ) : null}
                  </Td>
                  <Td>
                    {role == "Pedagogue" || role == "Headmaster" ? (
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        borderRadius="12px"
                        lineHeight="1"
                        size="md"
                        onClick={() => {
                          deleteChildren({
                            id: child.Id,
                          });
                        }}
                      />
                    ) : null}
                  </Td>
                  {role == "Pedagogue" || role == "Headmaster" ? (
                    <Td>
                      {!child.fatherId || !child.motherId ? (
                        <Tooltip label={t("children.tooltip.warning")}>
                          <WarningIcon color={"yellow.400"} />
                        </Tooltip>
                      ) : (
                        <Tooltip label={t("children.tooltip.success")}>
                          <CheckCircleIcon color={"green.400"} />
                        </Tooltip>
                      )}
                    </Td>
                  ) : null}
                </Tr>
              )
            )
          : null}
        {childrenFilter
          ? findChild(data, childrenFilter).map((child) => (
              <Tr>
                <Td>{child.Name}</Td>
                <Td ml={"2rem"}>{child.Surname}</Td>
                {role == "Teacher" ? (
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
                        setChild(child);
                        onOpen();
                      }}
                    />
                  </Td>
                ) : null}
                <Td>
                  {role == "Pedagogue" || role == "Headmaster" ? (
                    <NextLink
                      href={"/edit-child/[id]"}
                      as={`/edit-child/${child.Id}`}
                    >
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        bg="blue.400"
                        colorScheme="navItem"
                        borderRadius="12px"
                        py="4"
                        px="4"
                        lineHeight="1"
                        size="md"
                        ml={"2rem"}
                      />
                    </NextLink>
                  ) : null}
                </Td>
                <Td>
                  {role == "Pedagogue" || role == "Headmaster" ? (
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      borderRadius="12px"
                      lineHeight="1"
                      size="md"
                      onClick={() => {
                        deleteChildren({
                          id: child.Id,
                        });
                      }}
                    />
                  ) : null}
                </Td>
                {role == "Pedagogue" || role == "Headmaster" ? (
                  <Td>
                    {!child.fatherId || !child.motherId ? (
                      <Tooltip label={t("children.tooltip.warning")}>
                        <WarningIcon color={"yellow.400"} />
                      </Tooltip>
                    ) : (
                      <Tooltip label={t("children.tooltip.success")}>
                        <CheckCircleIcon color={"green.400"} />
                      </Tooltip>
                    )}
                  </Td>
                ) : null}
              </Tr>
            ))
          : null}
      </Tbody>
    </Table>
  );
};
