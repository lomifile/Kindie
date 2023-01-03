import { AppNav, Sidebar } from "../Navigation";

import Nav from "../../ui/Nav";
import React from "react";
import { useDisclosure } from "../../hooks";

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { getButtonProps, isOpen, onClose } = useDisclosure();
  const buttonProps = getButtonProps();

  return (
    <>
      <header>
        <Nav className="bg-gray-100 border-gray-200 sm:px-4 py-2 rounded w-full">
          <AppNav sidebarButtonRef={buttonProps} />
        </Nav>
      </header>
      <div className="w-full">
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <section>
          <div
            id="main"
            className="main-content flex-1 mt-12 md:mt-2 pb-24 md:pb-5"
          >
            {children}
          </div>
        </section>
      </div>
    </>
  );
};
