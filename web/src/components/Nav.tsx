import {
  Button,
  Flex,
  Stack,
  Box,
  Link,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Avatar,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  ClearKindergardenMutation,
  Exact,
  LogoutMutation,
  MeQuery,
  useClearKindergardenMutation,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { NextRouter, useRouter } from "next/router";
import { useTranslation, TFunction } from "react-i18next";
import { i18n } from "i18next";
import { HamburgerIcon } from "@chakra-ui/icons";
import Flags from "country-flag-icons/react/3x2";
import isElectron from "is-electron";
import { OperationContext, OperationResult } from "urql";
import { CustomSpinner } from "./Spinner";
import Image from "next/image";
import logo from "../../public/img/logo.png";

const DashNav = (t: TFunction<"data">) => (
  <>
    <NextLink href="/">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.home")}
      </Button>
    </NextLink>
    <NextLink href="/Aboutus">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.About-us")}
      </Button>
    </NextLink>
    <NextLink href="/contact">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.Contact-us")}
      </Button>
    </NextLink>
    <NextLink href="/dashboard">
      <Button
        colorScheme="navItem"
        borderRadius={"12px"}
        color="white"
        bg="blue.400"
      >
        {t("nav.Dashboard")}
      </Button>
    </NextLink>
  </>
);

const SignInNav = (t: TFunction<"data">) => (
  <>
    <NextLink href="/">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.home")}
      </Button>
    </NextLink>
    <NextLink href="/Aboutus">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.About-us")}
      </Button>
    </NextLink>
    <NextLink href="/contact">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        borderRadius={"12px"}
      >
        {t("nav.Contact-us")}
      </Button>
    </NextLink>
    <NextLink href="/login">
      <Button
        as={Link}
        className="nav-item"
        color="blue.400"
        colorScheme="navItem"
        variant="ghost"
        ml={"4"}
        borderRadius={"12px"}
      >
        {t("nav.Sign-in")}
      </Button>
    </NextLink>
    <NextLink href="/register">
      <Button
        className="nav-item"
        colorScheme="navItem"
        borderRadius={"12px"}
        color="white"
        bg="blue.400"
      >
        {t("nav.Sign-up")}
      </Button>
    </NextLink>
  </>
);

const DashMenu = (
  data: MeQuery,
  router: NextRouter,
  t: TFunction<"data">,
  i18n: i18n,
  logout: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      LogoutMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >,
  clearKindergarden: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      ClearKindergardenMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >
) => (
  <Stack direction={["column", "row"]}>
    <Menu>
      <MenuButton ml={["15px", "15px", "0", "0", "0"]} mb={"10px"}>
        <Avatar name={data.me.Name + " " + data.me.Surname} />
      </MenuButton>
      <MenuList borderRadius={"12px"} p={"3"}>
        <MenuGroup title={t("nav.menu.titles.navigation")}>
          <MenuItem
            borderRadius={"12px"}
            _hover={{
              bg: "gray.100",
              borderRadius: "12px",
            }}
            onClick={() => {
              clearKindergarden();
              router.push("/dashboard");
            }}
          >
            {t("nav.menu.dashboard")}
          </MenuItem>
          <NextLink href="/">
            <MenuItem
              _hover={{
                bg: "gray.100",
                borderRadius: "12px",
              }}
            >
              {t("nav.menu.landing-page")}
            </MenuItem>
          </NextLink>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title={t("nav.menu.titles.profile")}>
          <NextLink href="/settings">
            <MenuItem
              borderRadius={"12px"}
              _hover={{
                bg: "gray.100",
                borderRadius: "12px",
              }}
            >
              {t("nav.menu.settings")}
            </MenuItem>
          </NextLink>
          <MenuItem
            borderRadius={"12px"}
            _hover={{
              bg: "gray.100",
              borderRadius: "12px",
            }}
            onClick={() => {
              router.push("/login");
              logout();
            }}
          >
            {t("nav.menu.log-out")}
          </MenuItem>
        </MenuGroup>
        <MenuGroup alignContent="center">
          <Flex
            mt={5}
            align="center"
            justify="center"
            display={[
              "inline-flex",
              "inline-flex",
              "inline-flex",
              "inline-flex",
            ]}
          >
            <Button
              h={"50px"}
              w={"50px"}
              bg="transparent"
              onClick={() => {
                i18n.changeLanguage("hr");
              }}
            >
              <Flags.HR title="Hrvatski" />
            </Button>
            <Button
              h={"50px"}
              w={"50px"}
              bg="transparent"
              onClick={(e) => {
                i18n.changeLanguage("en");
              }}
            >
              <Flags.GB title="English" />
            </Button>
          </Flex>
        </MenuGroup>
      </MenuList>
    </Menu>
  </Stack>
);

const DrawerNav = (
  body: JSX.Element,
  onClose: () => void,
  isOpen: boolean,
  i18n: i18n
) => (
  <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading
            fontSize="xl"
            fontWeight="500"
            color="blue.400"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Kindie
          </Heading>
        </DrawerHeader>
        <DrawerBody>
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between"]}
            direction={["column", "column", "column"]}
            pt={[4, 4, 0, 0]}
          >
            {body}
            <Flex
              mt={5}
              align="center"
              justify="center"
              display={["inline-flex", "none", "none", "none"]}
            >
              <Button
                h={"50px"}
                w={"50px"}
                bg="transparent"
                onClick={() => {
                  i18n.changeLanguage("hr");
                }}
              >
                <Flags.HR title="Hrvatski" />
              </Button>
              <Button
                h={"50px"}
                w={"50px"}
                bg="transparent"
                onClick={(e) => {
                  i18n.changeLanguage("en");
                }}
              >
                <Flags.GB title="English" />
              </Button>
            </Flex>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

const ElectronMenu = (
  drawerOnClose: () => void,
  drawerIsOpen: boolean,
  drawerOnOpen: () => void,
  t: TFunction<"data">,
  router: NextRouter,
  logout: (
    variables?: Exact<{
      [key: string]: never;
    }>,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      LogoutMutation,
      Exact<{
        [key: string]: never;
      }>
    >
  >
) => (
  <>
    <Drawer placement="left" onClose={drawerOnClose} isOpen={drawerIsOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading
              fontSize="xl"
              fontWeight="500"
              color="blue.400"
              style={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              Kindie
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={8} align="center">
              <NextLink href="/dashboard">
                <Button
                  borderRadius={"12px"}
                  variant="ghost"
                  color="blue.400"
                  p={15}
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                >
                  {t("electron.toolbox.btn-dash")}
                </Button>
              </NextLink>
              <NextLink href="/settings">
                <Button
                  borderRadius={"12px"}
                  variant="ghost"
                  color="blue.400"
                  p={2}
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                >
                  {t("electron.toolbox.btn-settings")}
                </Button>
              </NextLink>
              <Button
                borderRadius={"12px"}
                variant="ghost"
                color="blue.400"
                p={2}
                _hover={{
                  backgroundColor: "gray.100",
                }}
                onClick={async () => {
                  await logout();
                  if (isServer()) {
                    router.push("/login");
                  } else {
                    router.reload();
                  }
                }}
              >
                {t("electron.toolbox.btn-logout")}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    <IconButton
      display={["flex", "flex", "flex", "flex"]}
      marginLeft={"5rem"}
      colorScheme="navItem"
      color="white"
      bg="blue.400"
      borderRadius={"12px"}
      className="menu-btn"
      aria-label="Open menu"
      onClick={drawerOnOpen}
      icon={<HamburgerIcon />}
    />
  </>
);

const BrowserNav = (i18n: i18n, variant: NavbarVariant) => (
  <>
    {variant === "normal" ? (
      <Box display={["none", "inline-flex", "inline-flex", "inline-flex"]}>
        <Button
          h={"50px"}
          w={"50px"}
          bg="transparent"
          onClick={() => {
            i18n.changeLanguage("hr");
          }}
        >
          <Flags.HR title="Hrvatski" />
        </Button>
        <Button
          h={"50px"}
          w={"50px"}
          bg="transparent"
          onClick={(e) => {
            i18n.changeLanguage("en");
          }}
        >
          <Flags.GB title="English" />
        </Button>
      </Box>
    ) : null}
  </>
);

export type NavbarVariant = "normal" | "user";

interface NavProps {
  variant: NavbarVariant;
}

export const Nav: React.FC<NavProps> = ({ variant = "normal" }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("data", { useSuspense: false });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [, clearKindergarden] = useClearKindergardenMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  let body: JSX.Element;
  if (fetching) {
    body = <CustomSpinner />;
  }
  if (variant == "normal" && !data?.me) {
    body = SignInNav(t);
  } else if (variant === "normal" && data?.me) {
    body = DashNav(t);
  } else if (variant === "user" && data?.me && !isElectron()) {
    body = DashMenu(data, router, t, i18n, logout, clearKindergarden);
  }

  return (
    <Flex
      as="nav"
      position={{ md: "sticky" }}
      bg="white"
      minH="5rem"
      w="100%"
      zIndex="99"
      borderTop={"4px"}
      borderColor="blue.400"
      mb={["15px", "15px", "15px", "0px", "0px"]}
    >
      <Image
        className="nav-pic-dummy"
        width="190px"
        height="100px"
        src={logo}
      />
      {DrawerNav(body, onClose, isOpen, i18n)}
      <Stack
        display="flex"
        direction={["column", "row"]}
        alignItems={["flex-end", "center"]}
        mt={"auto"}
        mb={"auto"}
      >
        <Flex>
          <Image className="nav-pic" width="300px" height="100px" src={logo} />
        </Flex>
        {!isElectron()
          ? BrowserNav(i18n, variant)
          : ElectronMenu(
              drawerOnClose,
              drawerIsOpen,
              drawerOnOpen,
              t,
              router,
              logout
            )}
      </Stack>
      {variant === "user" ? (
        <Box
          mr={"5rem"}
          ml={"auto"}
          mt={"auto"}
          mb={"auto"}
          className="navbar-nav"
          display={"inline-block"}
        >
          {body}
        </Box>
      ) : (
        <>
          <Box
            mr={"5rem"}
            ml={"auto"}
            mt={"auto"}
            mb={"auto"}
            className="navbar-nav"
            display={["none", "none", "none", "inline-block"]}
          >
            {body}
          </Box>
          <Box
            mr={"5rem"}
            ml={"auto"}
            mt={"auto"}
            mb={"auto"}
            display={["block", "block", "block", "none"]}
          >
            <IconButton
              display={["flex", "flex", "flex", "none"]}
              colorScheme="navItem"
              color="white"
              bg="blue.400"
              borderRadius={"12px"}
              className="menu-btn"
              aria-label="Open menu"
              onClick={onOpen}
              icon={<HamburgerIcon />}
            />
          </Box>
        </>
      )}
    </Flex>
  );
};
