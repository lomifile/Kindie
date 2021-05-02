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
  useColorMode,
  useColorModeValue,
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
import { bgColor } from "../utils/colorModeColors";
export type NavbarVariant = "normal" | "user";

interface NavProps {
  variant: NavbarVariant;
}

export const Nav: React.FC<NavProps> = ({ variant = "normal" }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  const bg = useColorModeValue(bgColor.light, bgColor.dark);
  const textColor = useColorModeValue("primary.800", "brand.200");
  const headerColor = useColorModeValue("blue.400", "brand.100");
  const btnColor = useColorModeValue("blue.400", "transparent");
  const btnBorderColor = useColorModeValue("none", "brand.200");
  const btnTextColor = useColorModeValue("white", "brand.200");
  const { t, i18n } = useTranslation("data", { useSuspense: false });
  const router = useRouter();
  const btnRef = React.useRef();
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
            color={headerColor}
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
            color={headerColor}
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
            color={headerColor}
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
            color={headerColor}
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
            variant={colorMode === "dark" ? "outline" : "solid"}
            borderColor={btnBorderColor}
            bg={btnColor}
            color={btnTextColor}
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
            color={headerColor}
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
            color={headerColor}
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
            color={headerColor}
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
            variant={colorMode === "dark" ? "outline" : "solid"}
            borderColor={btnBorderColor}
            bg={btnColor}
            color={btnTextColor}
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
          <MenuList bg={bg} color={textColor}>
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
      bg={bg}
      minH="5rem"
      w="100%"
      zIndex="99"
      borderTop={"4px"}
      borderColor="blue.400"
    >
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg={bg} color={textColor}>
          <DrawerContent bg={bg} color={textColor}>
            <DrawerCloseButton color={textColor} />
            <DrawerHeader bg={bg} color={textColor}>
              <Heading
                bg={bg}
                color={textColor}
                fontSize="xl"
                fontWeight="500"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                DV Organizator
              </Heading>
            </DrawerHeader>
            <DrawerBody bg={bg} color={textColor}>
              <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between"]}
                direction={["column", "column", "column"]}
                pt={[4, 4, 0, 0]}
                bg={bg}
                color={textColor}
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
          color={headerColor}
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
      <Button colorScheme="pink" onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </Flex>
  );
};
