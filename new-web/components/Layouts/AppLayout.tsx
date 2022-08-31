import { AppNav, Sidebar } from "../Navigation";

import Nav from "../../ui/Nav";
import React from "react";

interface AppLayoutProps extends React.HTMLAttributes<HTMLElement> {}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <Nav className="bg-gray-100 border-gray-200 sm:px-4 py-2 rounded ">
          <AppNav />
        </Nav>
      </header>
      <div className="w-full">
        <Sidebar />
        <section>
          <div
            id="main"
            className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
          >
            {children}
          </div>
        </section>
      </div>
    </>
  );
};
