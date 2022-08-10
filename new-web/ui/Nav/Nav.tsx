import React, { HTMLAttributes } from "react";
import { BiX } from "react-icons/bi";
import Button from "../Button";

interface NavProps extends HTMLAttributes<HTMLElement> {
  variant?: "menu" | "nav";
  isOpen: boolean;
  onClose: () => void;
}

export const Nav: React.FC<NavProps> = ({
  variant = "nav",
  isOpen,
  onClose,
  children,
  ...props
}) => {
  if (variant === "menu") {
    return (
      <nav
        aria-expanded={isOpen}
        className={`fixed top-0 left-[${
          isOpen ? "0" : "-250"
        }px] w-[250px] h-screen z-50 bg-primary text-secondary p-5
      flex flex-col space-y-5 duration-500 ease-in-out`}
        {...props}
      >
        <div className="flex h-2 w-full flex-row-reverse">
          <Button
            className="text-4xl text-white items-center cursor-pointer fixed"
            onClick={onClose}
          >
            <BiX />
          </Button>
        </div>
        <br />
        {children}
      </nav>
    );
  }
  return (
    <nav className="p-8 w-full flex flex-row" {...props}>
      {children}
    </nav>
  );
};
