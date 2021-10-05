import {
  Box,
  Flex,
  Heading,
  SkeletonText,
  Button,
  HStack,
  IconButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  useDeleteChildrenMutation,
  useShowChildrenNotIngroupQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import NextLink from "next/link";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation, TFunction } from "react-i18next";
import { CustomAlert } from "../components/Alerts";
import { getUserRole } from "../utils/getUserRole";
import { ChildrenModal } from "../components/ChildrenModal";
import isElectron from "is-electron";
import router, { NextRouter } from "next/router";
import { ChildrenDataTable } from "../components/ChildrenDataTable";

const MainHeader = (role: string, t: TFunction<"data">, router: NextRouter) => (
  <Flex justify={["center", "center", "center", "center", "center"]}>
    <HStack spacing={5}>
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
          mr={2}
        />
      ) : null}
      <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
        {t("children.main-header")}
      </Heading>
      {role == "Headmaster" || role == "Pedagogue" ? (
        <NextLink href="/create-child">
          <IconButton
            bg="blue.400"
            colorScheme="navItem"
            borderRadius="12px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            ml={"2rem"}
            aria-label={"Create child"}
            icon={<AddIcon />}
          />
        </NextLink>
      ) : null}
    </HStack>
  </Flex>
);

const Children: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });

  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [childrenFilter, setChildrenFilter] = useState("");
  const [{ data, fetching }] = useShowChildrenNotIngroupQuery({
    variables,
  });

  const role = getUserRole();

  const [, deleteChildren] = useDeleteChildrenMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [child, setChild] = useState(null);

  if (!fetching && !data) {
    return (
      <CustomAlert
        status={"error"}
        name={t("children.alert.title")}
        data={t("children.alert.desc")}
      />
    );
  }

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("children.main-header")}</title>
      {role == "Teacher" ? (
        <ChildrenModal onClose={onClose} isOpen={isOpen} child={child} />
      ) : null}
      {MainHeader(role, t, router)}
      <Flex justify={"center"}>
        <Box
          w={["100%", "100%", "100%", "80%", "100%"]}
          display={["block", "block", "block", "block"]}
          overflowX={["auto", "auto", "hidden", "hidden"]}
        >
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
          {fetching && !data ? (
            <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          ) : (
            <ChildrenDataTable
              data={data}
              childrenFilter={childrenFilter}
              deleteChildren={deleteChildren}
              onOpen={onOpen}
              role={role}
              setChild={setChild}
            />
          )}
          {data && data.showChildrenFilterNotInGroup.hasMore ? (
            <Flex>
              <Button
                onClick={() => {
                  setVariables({
                    limit: variables.limit,
                    cursor:
                      data.showChildrenFilterNotInGroup.children[
                        data.showChildrenFilterNotInGroup.children.length - 1
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
          ) : null}
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Children);
