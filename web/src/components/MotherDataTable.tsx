import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { OperationContext, OperationResult } from "@urql/core";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShowMotherQuery,
  Exact,
  DeleteMotherMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

interface MotherDataTableProps {
  mother: ShowMotherQuery;
  role: string;
  onOpen: () => void;
  deleteMother: (
    variables?: Exact<{
      motherId: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteMotherMutation,
      Exact<{
        motherId: number;
      }>
    >
  >;
  setParent: React.Dispatch<any>;
  motherFilter: string;
}

const useSortableData = (items, config = null) => {
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

const findMother = (data: ShowMotherQuery, filter: string) => {
  let filterMother = data.showMother.mother.filter(
    (mom) => mom.Name === filter
  );
  return filterMother;
};

export const MotherDataTable: React.FC<MotherDataTableProps> = ({
  mother,
  role,
  deleteMother,
  onOpen,
  setParent,
  motherFilter,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });

  const { items, requestSort, sortConfig } = useSortableData(
    mother!.showMother?.mother
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
      <Thead>
        <Tr>
          <Th>
            <Button
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _selected={{ bg: "transparent" }}
              onClick={() => requestSort("Name")}
            >
              {t("parents.tbl-name")}
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
              {t("parents.tbl-surname")}
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
              {t("parents.tbl-date")}
              {getClassNamesFor("createdAt")}
            </Button>
          </Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {!motherFilter
          ? items.map((mom) =>
              !mom ? null : (
                <Tr>
                  <Td>{mom.Name}</Td>
                  <Td ml={"2rem"}>{mom.Surname}</Td>
                  <Td>{moment(mom.createdAt).format("DD-MM-yyyy")}</Td>
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
                          setParent(mother);
                          onOpen();
                        }}
                      />
                    </Td>
                  ) : null}
                  <Td>
                    {role == "Pedagogue" || role == "Headmaster" ? (
                      <NextLink
                        href={"/edit-parents/mother/[id]"}
                        as={`/edit-parents/mother/${mom.Id}`}
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
                          deleteMother({
                            motherId: mom.Id,
                          });
                        }}
                      />
                    ) : null}
                  </Td>
                </Tr>
              )
            )
          : null}
        {motherFilter
          ? findMother(mother, motherFilter).map((mom) => (
              <Tr>
                <Td>{mom.Name}</Td>
                <Td ml={"2rem"}>{mom.Surname}</Td>
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
                        setParent(mother);
                        onOpen();
                      }}
                    />
                  </Td>
                ) : null}
                <Td>
                  {role == "Pedagogue" || role == "Headmaster" ? (
                    <NextLink
                      href={"/edit-parents/mother/[id]"}
                      as={`/edit-parents/mother/${mom.Id}`}
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
                        deleteMother({
                          motherId: mom.Id,
                        });
                      }}
                    />
                  ) : null}
                </Td>
              </Tr>
            ))
          : null}
      </Tbody>
    </Table>
  );
};
