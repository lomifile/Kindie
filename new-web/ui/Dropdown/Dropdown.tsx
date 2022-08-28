import React, { HTMLAttributes } from "react";

import { useDisclosure } from "../../hooks";

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  title: string;
  icon?: JSX.Element;
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  icon,
  children,
}) => {
  const { getButtonProps, getDisclosureprops } = useDisclosure();
  return (
    <>
      <button
        type="button"
        className="flex items-center p-2 w-full text-base font-normal rounded-lg transition duration-75 group"
        {...getButtonProps()}
      >
        {icon}
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <ul {...getDisclosureprops()} className="py-2 space-y-2">
        {children}
      </ul>
    </>
  );
};
