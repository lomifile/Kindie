import { ViewIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Table, Thead, Tr, Th, Tbody, Td, IconButton } from "@chakra-ui/react";
import { OperationContext, OperationResult } from "@urql/core";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShowfatherQuery,
  Exact,
  DeleteFatherMutation,
} from "../generated/graphql";
import NextLink from "next/link";

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
}

export const FatherDataTable: React.FC<FatherDataTableProps> = ({
  father,
  role,
  setParent,
  onOpen,
  deleteFather,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  return (
    <Table mt={"2rem"}>
      <Thead>
        <Tr>
          <Th>{t("parents.tbl-name")}</Th>
          <Th>{t("parents.tbl-surname")}</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {father!.showFather.father.map((father) =>
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
        )}
      </Tbody>
    </Table>
  );
};
