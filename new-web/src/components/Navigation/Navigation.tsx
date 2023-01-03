import Button from "../../ui/Button";
import { MenuIcon } from "../../ui/Icons";
import Nav from "../../ui/Nav";
import { NavMenu } from "./NavMenu";
import type { NavProps } from "../../ui/Nav";
import React from "react";
import { useDisclosure } from "../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/utils";

interface NavigationProps extends NavProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const { getButtonProps, getDisclosureprops } = useDisclosure();

  const router = useRouter();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureprops();
  const [navColor, setNavColor] = React.useState<"white" | "primary">(
    router.pathname === "/" ? "primary" : "white"
  );
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  React.useEffect(() => {
    const handleScroll = (event: Event) => {
      if (window.scrollY === 0 && router.pathname === "/") {
        setNavColor("primary");
      } else if (window.scrollY > 0 && router.pathname === "/") {
        setNavColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);

  return (
    <Nav
      className={`bg-${navColor} fixed z-20 px-2 sm:px-4 py-3 w-full top-0 left-0 transition-all ${
        navColor === "primary" ? "border-primary" : "border-gray-200"
      }`}
    >
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          {/* Dodati sliku!!! */}
          <span
            className={`self-center text-xl font-semibold whitespace-nowrap ${
              navColor === "primary" ? "text-white" : "text-accent"
            } xs:ml-7 `}
          >
            Kindie
          </span>
        </a>
        <div className="flex md:order-2">
          {!data?.me && !fetching ? (
            <>
              <Link href="/login">
                <Button
                  type="button"
                  className="text-accent bg-transparent focus:ring-none focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-2"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  type="button"
                  className="text-white bg-accent focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                >
                  Get started
                </Button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <Button
                type="button"
                className="text-white bg-accent focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                Go to dashboard
              </Button>
            </Link>
          )}
          <Button
            className={`inline-flex items-center p-2 text-sm ${
              navColor === "primary" ? "text-gray-100" : "text-accent"
            } rounded-lg md:hidden hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-20`}
            {...buttonProps}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </Button>
        </div>
        <div
          className="justify-between items-center w-full md:flex md:w-auto 
          md:order-1"
          {...disclosureProps}
        >
          <NavMenu />
        </div>
      </div>
    </Nav>
  );
};
