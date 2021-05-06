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
  Spinner,
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
import { Image } from "@chakra-ui/image";
// @ts-ignore
import logo from "../img/logo.png";
import React, { useState } from "react";
import NextLink from "next/link";
import {
  useClearKindergardenMutation,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsAuth } from "../utils/useIsAuth";
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
  let body;
  if (fetching) {
    body = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.400"
        size="sm"
      />
    );
  }
  if (variant == "normal" && !data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Button
            as={Link}
            className="nav-item"
            color="blue.400"
            colorScheme="navItem"
            variant="ghost"
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
  } else if (variant == "normal" && data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Button
            as={Link}
            className="nav-item"
            color="blue.400"
            colorScheme="navItem"
            variant="ghost"
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
  } else if (variant == "user" && data?.me) {
    body = (
      <Stack direction={["column", "row"]}>
        <Menu>
          <MenuButton ml={["15px", "15px", "0", "0", "0"]} mb={"10px"}>
            <Avatar name={data.me.Name + " " + data.me.Surname} />
          </MenuButton>
          <MenuList>
            <MenuGroup title={t("nav.menu.titles.navigation")}>
              <MenuItem
                onClick={() => {
                  clearKindergarden();
                  router.push("/dashboard");
                }}
              >
                {t("nav.menu.dashboard")}
              </MenuItem>
            </MenuGroup>
            <MenuGroup title={t("nav.menu.titles.profile")}>
              <NextLink href="/profile">
                <MenuItem>{t("nav.menu.acc")}</MenuItem>
              </NextLink>
              <MenuItem>{t("nav.menu.settings")}</MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout();
                  if (isServer()) {
                    router.push("/login");
                  } else {
                    router.reload();
                  }
                }}
              >
                {t("nav.menu.log-out")}
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title={t("nav.menu.titles.help")}>
              <NextLink href="/">
                <MenuItem>{t("nav.menu.landing-page")}</MenuItem>
              </NextLink>
              <MenuItem>{t("nav.menu.docs")}</MenuItem>
              <MenuItem>{t("nav.menu.faq")}</MenuItem>
            </MenuGroup>
            <MenuGroup alignContent="center">
              <Flex
                mt={5}
                align="center"
                justify="center"
                display={["inline-flex", "none", "none", "none"]}
              >
                <Button
                  bg="transparent"
                  onClick={() => {
                    i18n.changeLanguage("hr");
                  }}
                >
                  🇭🇷
                </Button>
                <Button
                  bg="transparent"
                  onClick={(e) => {
                    i18n.changeLanguage("en");
                  }}
                >
                  🇬🇧
                </Button>
              </Flex>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Stack>
    );
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
    >
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
                DV Organizator
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
                    bg="transparent"
                    onClick={() => {
                      i18n.changeLanguage("hr");
                    }}
                  >
                    🇭🇷
                  </Button>
                  <Button
                    bg="transparent"
                    onClick={(e) => {
                      i18n.changeLanguage("en");
                    }}
                  >
                    🇬🇧
                  </Button>
                </Flex>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Stack
        direction={["column", "row"]}
        alignItems={["flex-end", "center"]}
        mt={"auto"}
        mb={"auto"}
      >
        <Image boxSize="56px" src={logo} ml={"5rem"} mb={"4"} />
        <Heading
          display={["none", "none", "block", "block"]}
          fontSize="xl"
          fontWeight="500"
          color="blue.400"
          style={{ fontWeight: "bold", textTransform: "uppercase" }}
        >
          DV Organizator
        </Heading>
        <Box display={["none", "inline-flex", "inline-flex", "inline-flex"]}>
          <Button
            bg="transparent"
            onClick={() => {
              i18n.changeLanguage("hr");
            }}
          >
            🇭🇷
          </Button>
          <Button
            bg="transparent"
            onClick={(e) => {
              i18n.changeLanguage("en");
            }}
          >
            🇬🇧
          </Button>
        </Box>
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
