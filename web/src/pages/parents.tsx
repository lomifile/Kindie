import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useIsAuth } from "../utils/useIsAuth";
import {
  useShowfatherQuery,
  useShowMotherQuery,
  useDeleteMotherMutation,
  useDeleteFatherMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { AddIcon, ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { getUserRole } from "../utils/getUserRole";
import { ParentsModal } from "../components/ParentsModal";
import isElectron from "is-electron";
import router from "next/router";
import { MotherDataTable } from "../components/MotherDataTable";
import { FatherDataTable } from "../components/FatherDataTable";

const Parents: React.FC<{}> = ({}) => {
  useIsAuth();
  const { t } = useTranslation("data", { useSuspense: false });
  const role = getUserRole();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parent, setParent] = useState(null);

  const [motherVariables, setMotherVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [fatherVariables, setFatherVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data: mother, fetching: motherFetching }] = useShowMotherQuery({
    variables: motherVariables,
  });
  const [{ data: father, fetching: fatherFetching }] = useShowfatherQuery({
    variables: fatherVariables,
  });

  const [, deleteMother] = useDeleteMotherMutation();
  const [, deleteFather] = useDeleteFatherMutation();

  const [motherFilter, setMotherFilter] = useState("");
  const [fatherFilter, setFatherFilter] = useState("");

  return (
    <Layout navbarVariant="user" variant="column">
      <title>{t("parents.main-header")}</title>
      <ParentsModal data={parent} isOpen={isOpen} onClose={onClose} />
      <Stack spacing={1}>
        <Flex align="center" justify="center" mt={5} p={3}>
          <HStack p={2} spacing={4}>
            {isElectron() ? (
              <Flex justifyContent="left" alignContent="flex-start">
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
              </Flex>
            ) : null}
            <Heading ml={["25px", "25px", "0", "0", "0"]} color="blue.400">
              {t("parents.main-header")}
            </Heading>
            {role == "Headmaster" || role == "Pedagogue" ? (
              <>
                <Menu>
                  <MenuButton
                    bg="blue.400"
                    className="nav-item"
                    colorScheme="navItem"
                    borderRadius="12px"
                    py="4"
                    px="4"
                    ml={5}
                    lineHeight="1"
                    size="md"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    <AddIcon />
                  </MenuButton>
                  <MenuList borderRadius={"12px"}>
                    <NextLink href="/create-mother">
                      <MenuItem>
                        {t("create-parents.main-header-mother")}
                      </MenuItem>
                    </NextLink>
                    <NextLink href="create-father">
                      <MenuItem>
                        {t("create-parents.main-header-father")}
                      </MenuItem>
                    </NextLink>
                  </MenuList>
                </Menu>
              </>
            ) : null}
          </HStack>
        </Flex>
      </Stack>
      <Divider mt={5} mb={5} />
      <Tabs variant="solid-rounded" colorScheme="blue">
        <TabList>
          <Tab _selected={{ bg: "blue.400", color: "white" }}>
            {t("parents.heading-mother")}
          </Tab>
          <Tab _selected={{ bg: "blue.400", color: "white" }}>
            {t("parents.heading-father")}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            display="flex"
            flexDirection="column"
            minH="20vh"
            minW="80vh"
          >
            {!(mother?.showMother.mother.length <= 0) ? (
              <Stack
                spacing={4}
                w={{ base: "100%", md: "100%" }}
                align={["center", "center", "center", "center", "center"]}
              >
                <Flex flexDirection="row">
                  <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="blue.400"
                    textAlign={["center", "center", "left", "left"]}
                  >
                    {t("parents.heading-mother")}
                  </Heading>
                </Flex>
                <Box
                  w={["100%", "100%", "100%", "80%", "100%"]}
                  display={["block", "block", "block", "block"]}
                  overflowX={["auto", "auto", "hidden", "hidden"]}
                >
                  <Flex mt="5">
                    <InputGroup mt="2" flex="1" justifySelf="center">
                      <InputLeftAddon
                        borderRadius="48px"
                        children={t("parents.tbl-filter-mother")}
                      />
                      <Input
                        borderRadius="48px"
                        name="search"
                        id="search"
                        type="text"
                        placeholder={t("parents.input")}
                        onChange={(e) => {
                          setMotherFilter(e.currentTarget.value);
                        }}
                      />
                    </InputGroup>
                  </Flex>
                  {motherFetching && !mother ? (
                    <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                      <SkeletonText mt="4" noOfLines={4} spacing="4" />
                    </Box>
                  ) : (
                    <MotherDataTable
                      deleteMother={deleteMother}
                      mother={mother}
                      onOpen={onOpen}
                      role={role}
                      setParent={setParent}
                      motherFilter={motherFilter}
                    />
                  )}
                </Box>
              </Stack>
            ) : null}
            {mother?.showMother?.hasMore ? (
              <Flex>
                <Button
                  onClick={() => {
                    setMotherVariables({
                      limit: motherVariables.limit,
                      cursor:
                        mother.showMother.mother[
                          mother.showMother.mother.length - 1
                        ].createdAt,
                    });
                  }}
                  isLoading={motherFetching}
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
                  {t("parents.btn-load-more")}
                </Button>
              </Flex>
            ) : null}
          </TabPanel>
          <TabPanel>
            {!(father?.showFather.father.length <= 0) ? (
              <Stack
                spacing={4}
                w={{ base: "100%", md: "100%" }}
                align={["center", "center", "center", "center", "center"]}
              >
                <Flex flexDirection="row">
                  <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="blue.400"
                    textAlign={["center", "center", "left", "left"]}
                  >
                    {t("parents.heading-father")}
                  </Heading>
                </Flex>
                <Box
                  w={["100%", "100%", "100%", "80%", "100%"]}
                  display={["block", "block", "block", "block"]}
                  overflowX={["auto", "auto", "hidden", "hidden"]}
                >
                  <Flex mt="5">
                    <InputGroup mt="2" flex="1" justifySelf="center">
                      <InputLeftAddon
                        borderRadius="48px"
                        children={t("parents.tbl-filter-father")}
                      />
                      <Input
                        borderRadius="48px"
                        name="search"
                        id="search"
                        type="text"
                        placeholder={t("parents.input")}
                        onChange={(e) => {
                          setFatherFilter(e.currentTarget.value);
                        }}
                      />
                    </InputGroup>
                  </Flex>
                  {fatherFetching && !father ? (
                    <Box mt={10} mb={10} padding="10" boxShadow="lg" bg="white">
                      <SkeletonText mt="4" noOfLines={4} spacing="4" />
                    </Box>
                  ) : (
                    <FatherDataTable
                      deleteFather={deleteFather}
                      father={father}
                      onOpen={onOpen}
                      role={role}
                      setParent={setParent}
                      fatherFilter={fatherFilter}
                    />
                  )}
                </Box>
              </Stack>
            ) : null}
            {father?.showFather?.hasMore ? (
              <Flex>
                <Button
                  onClick={() => {
                    setFatherVariables({
                      limit: fatherVariables.limit,
                      cursor:
                        father.showFather.father[
                          father.showFather.father.length - 1
                        ].createdAt,
                    });
                  }}
                  isLoading={fatherFetching}
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
                  {t("parents.btn-load-more")}
                </Button>
              </Flex>
            ) : null}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Parents);
