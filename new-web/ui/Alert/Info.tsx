import React, { HTMLAttributes, useState } from "react";

import { KindieX } from "../Icons";
import { useDisclosure } from "../../hooks";

interface InfoProps extends HTMLAttributes<HTMLElement> {}

export const Info: React.FC<InfoProps> = ({ children }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  if (!isOpen) return null;
  return (
    <div
      className="flex p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200"
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-5 h-5 text-blue-700 dark:text-blue-800"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium text-blue-700 dark:text-blue-800">
        {children}
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <KindieX />
      </button>
    </div>
  );
};
