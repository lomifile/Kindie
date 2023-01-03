import Dropdown from "../../ui/Dropdown";
import Menu from "../../ui/Menu";
import React from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ children, isOpen, onClose }: SidebarProps) => {
  return (
    <Menu isOpen={isOpen} onClose={onClose} variant="closable" title="Menu">
      <div className="overflow-y-auto py-4 px-3 bg-gray-100 h-screen w-full border-none">
        <ul className="space-y-2 border-none w-full">
          <li className="text-accent hover:text-gray-900">
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-accent rounded-lg hover:bg-gray-100 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <Dropdown
            className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100"
            title="Kindergarden"
            as="li"
            icon={
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-7 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            }
          >
            <li>
              <a
                href="#"
                className="flex items-center group p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
              >
                Kindergarden 1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
              >
                Kindergarden 2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100"
              >
                Kindergarden 3
              </a>
            </li>
          </Dropdown>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base group font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full">
                3
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Staff</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">Attendance</span>
            </a>
          </li>
        </ul>
      </div>
    </Menu>
  );
};
