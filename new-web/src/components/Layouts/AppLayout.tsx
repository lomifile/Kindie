import { AppNav, Sidebar } from "../Navigation";

import Nav from "../../ui/Nav";
import React from "react";
import { useDisclosure } from "../../hooks";

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { getButtonProps, isOpen, onClose } = useDisclosure();
  const buttonProps = getButtonProps();

  return (
    <div className="flex flex-column w-full md:pl-[255px]">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <div id="main" className="w-full mb-[30px]">
        <Nav className="bg-white py-2 rounded w-full">
          <AppNav />
        </Nav>
        {children}
      </div>
    </div>
  );
};
