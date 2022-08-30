import React from "react";

interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {}

export const NavMenu: React.FC<NavMenuProps> = ({}) => {
  return (
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      <li>
        <a
          href="/"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 "
          aria-current="page"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/about-us"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 "
        >
          About us
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 "
        >
          Services
        </a>
      </li>
    </ul>
  );
};
