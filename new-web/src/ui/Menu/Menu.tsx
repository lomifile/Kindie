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
            " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out border-none w-full " +
            (isOpen
              ? " transition-opacity opacity-100 duration-500 translate-x-0  "
              : " transition-all delay-500 opacity-0 -translate-x-full  ")
          }
          {...props}
        >
          <div
            className={
              "w-screen max-w-[300px] left-0 absolute bg-gray-100 h-full delay-400 duration-500 ease-in-out transition-all transform border-none  " +
              (isOpen ? " translate-x-0 " : " -translate-x-full ")
            }
          >
            <div className="flex items-center relative w-full p-2 justify-between border-none">
              <h5
                id="drawer-navigation-label"
                className="text-base self-center font-semibold text-accent uppercase p-2"
              >
                {title}
              </h5>
              <button
                className="text-gray-400 bg-transparent hover:bg-primary hover:text-white rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            {children}
          </div>
          <section
            className="w-screen h-full cursor-pointer"
            onClick={onClose}
          ></section>
        </div>
      );
    case "static":
      return (
        <div className="flex flex-column mb-[30px] w-full md:h-full md:left-0 md:overflow-x-hidden md:overflow-y-auto md:fixed md:top-0 md:w-64 md:z-[1030]">
          {children}
        </div>
      );
    case "nav":
      return <nav></nav>;
    default:
      return <div></div>;
  }
};
