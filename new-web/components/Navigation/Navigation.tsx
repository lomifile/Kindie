import Button from "../../ui/Button";
import { MenuIcon } from "../../ui/Icons";
import Nav from "../../ui/Nav";
import { NavMenu } from "./NavMenu";
import type { NavProps } from "../../ui/Nav";
import React from "react";
import { useDisclosure } from "../../hooks";

interface NavigationProps extends NavProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
  const { getButtonProps, getDisclosureprops } = useDisclosure();

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureprops();

  return (
    <Nav className="bg-white px-2 sm:px-4 py-2.5 w-full top-0 left-0 border-b border-gray-200">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          {/* Dodati sliku!!! */}
          <span className="self-center text-xl font-semibold whitespace-nowrap text-primary xs:ml-7 ">
            Kindie
          </span>
        </a>
        <div className="flex md:order-2">
          <Button
            type="button"
            className="text-white bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
          >
            Get started
          </Button>
          <Button
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...buttonProps}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </Button>
        </div>
        <div
          className="justify-between items-center w-full md:flex md:w-auto md:order-1"
          {...disclosureProps}
        >
          <NavMenu />
        </div>
      </div>
    </Nav>
  );
};
