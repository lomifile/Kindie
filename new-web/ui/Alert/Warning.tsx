import React, { HTMLAttributes, useState } from "react";
import { KindieX } from "../Icons";

interface WarningProps extends HTMLAttributes<HTMLElement> {}

export const Warning: React.FC<WarningProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      id="alert-4"
      className={`flex p-4 mb-4 bg-yellow-100 rounded-lg dark:bg-yellow-200 ${
        !isOpen && "hidden"
      }`}
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-5 h-5 text-yellow-700 dark:text-yellow-800"
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
      <div className="ml-3 text-sm font-medium text-yellow-700 dark:text-yellow-800">
        {children}
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300"
        onClick={() => setIsOpen(false)}
      >
        <span className="sr-only">Close</span>
        <KindieX />
      </button>
    </div>
  );
};
