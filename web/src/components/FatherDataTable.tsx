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
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShowfatherQuery,
  Exact,
  DeleteFatherMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FatherDataTableProps {
  father: ShowfatherQuery;
  role: string;
  setParent: React.Dispatch<any>;
  onOpen: () => void;
  deleteFather: (
    variables?: Exact<{
      fatherId: number;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      DeleteFatherMutation,
      Exact<{
        fatherId: number;
      }>
    >
  >;
  fatherFilter: string;
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

const findFather = (data: ShowfatherQuery, filter: string) => {
  let filterFather = data.showFather.father.filter(
    (father) => father.Name === filter
  );
  return filterFather;
};

export const FatherDataTable: React.FC<FatherDataTableProps> = ({
  father,
  role,
  setParent,
  onOpen,
  deleteFather,
  fatherFilter,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });

  const { items, requestSort, sortConfig } = useSortableData(
    father!.showFather.father
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
            <Button onClick={() => requestSort("Name")}>
              {t("parents.tbl-name")}
              {getClassNamesFor("Name")}
            </Button>
          </Th>
          <Th>
            <Button onClick={() => requestSort("Surname")}>
              {t("parents.tbl-surname")}
              {getClassNamesFor("Surname")}
            </Button>
          </Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {!fatherFilter
          ? father.showFather.father.map((father) =>
              !father ? null : (
                <Tr>
                  <Td>{father.Name}</Td>
                  <Td ml={"2rem"}>{father.Surname}</Td>
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
                          setParent(father);
                          onOpen();
                        }}
                      />
                    </Td>
                  ) : null}
                  <Td>
                    {role == "Pedagogue" || role == "Headmaster" ? (
                      <NextLink
                        href={"/edit-parents/father/[id]"}
                        as={`/edit-parents/father/${father.Id}`}
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
                          deleteFather({
                            fatherId: father.Id,
                          });
                        }}
                      />
                    ) : null}
                  </Td>
                </Tr>
              )
            )
          : null}
        {fatherFilter
          ? findFather(father, fatherFilter).map((father) => (
              <Tr>
                <Td>{father.Name}</Td>
                <Td ml={"2rem"}>{father.Surname}</Td>
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
                        setParent(father);
                        onOpen();
                      }}
                    />
                  </Td>
                ) : null}
                <Td>
                  {role == "Pedagogue" || role == "Headmaster" ? (
                    <NextLink
                      href={"/edit-parents/father/[id]"}
                      as={`/edit-parents/father/${father.Id}`}
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
                        deleteFather({
                          fatherId: father.Id,
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
