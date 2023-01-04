import Dropdown from "../../ui/Dropdown";
import Menu from "../../ui/Menu";
import React from "react";
import { routes } from "./sideBarData";
import { useRouter } from "next/router";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  return (
    <Menu isOpen={isOpen} onClose={onClose} variant="static" title="Menu">
      <div className="overflow-y-auto py-3 px-1 bg-gray-100 w-full border-none">
        <div className="flex flex-row px-1 items-center justify-center">
          <div className="flex rounded-lg w-full justify-center items-center">
            <img
              className="w-14 h-14 rounded-lg"
              src="/FilipIvanusec.jpeg"
              alt="logo"
            />
          </div>
          <div className="flex flex-col w-full">
            <h1 className="text-xl text-primary">Kindie</h1>
            <span className="text-xs text-gray-400">Home of documentation</span>
          </div>
        </div>
        <div className="mt-7 px-2">
          <span className="uppercase font-bold text-[11px] p-2 text-gray-400">
            main menu
          </span>
          <ul className=" border-none w-full gap-2">
            {routes.map((e, idx) => {
              if (e.route === router.pathname)
                return (
                  <li className="text-accent hover:text-gray-900" key={idx}>
                    <a
                      href={e.route}
                      className="flex items-center p-2 text-base font-normal text-gray-100 rounded-lg group bg-primary"
                    >
                      {e.icon ? (
                        e.icon
                      ) : (
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-100 transition duration-75  group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                      )}
                      <span className="ml-3">{e.name}</span>
                    </a>
                  </li>
                );
              return (
                <li className="text-accent hover:text-gray-900" key={idx}>
                  <a
                    href={e.route}
                    className="flex items-center p-2 text-base font-normal text-accent rounded-lg hover:bg-gray-100 group"
                  >
                    {e.icon ? (
                      e.icon
                    ) : (
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
                    )}
                    <span className="ml-3">{e.name}</span>
                  </a>
                </li>
              );
            })}
            {/* <Dropdown
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
            </Dropdown> */}
            {/* <li>
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
            </li> */}
          </ul>
        </div>
      </div>
    </Menu>
  );
};
