import React, { HTMLAttributes } from "react";

import { BiX } from "react-icons/bi";
import Button from "../Button";

interface MenuProps extends HTMLAttributes<HTMLElement> {
  variant?: "static" | "closable" | "nav";
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  variant = "static",
  title,
  isOpen,
  onClose,
  children,
  ...props
}) => {
  switch (variant) {
    case "closable":
      if (!onClose && !isOpen) return null;
      return (
        <div
          aria-expanded={isOpen}
          id="menu"
          className={
            " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
            (isOpen
              ? " transition-opacity opacity-100 duration-500 translate-x-0  "
              : " transition-all delay-500 opacity-0 -translate-x-full  ")
          }
          {...props}
        >
          <section
            className={
              "w-screen max-w-lg left-0 absolute bg-gray-800 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
              (isOpen ? " translate-x-0 " : " -translate-x-full ")
            }
          >
            <article className="relative w-screen max-w-lg pb-5 flex flex-col space-y-6 overflow-y-scroll h-full">
              <div className="flex relative w-full p-2 justify-between">
                <header className="left-0 p-4 font-bold text-lg">
                  {title}
                </header>
                <Button
                  className="text-4xl text-primary right-0 cursor-pointer"
                  onClick={onClose}
                >
                  <BiX />
                </Button>
              </div>
              {children}
            </article>
          </section>
          <section
            className="w-screen h-full cursor-pointer"
            onClick={onClose}
          ></section>
        </div>
      );
    case "static":
      return <div className="w-64">{children}</div>;
    case "nav":
      return <nav></nav>;
    default:
      return <div></div>;
  }
};
