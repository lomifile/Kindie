import React from "react";
import { Variants, motion } from "framer-motion";
import { useDisclosure } from "../../hooks";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { HashLoader } from "react-spinners";
import router from "next/router";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface AppNavProps extends React.HTMLAttributes<HTMLElement> {
  sidebarButtonRef?: any;
}

export const AppNav = ({ sidebarButtonRef }: AppNavProps) => {
  const { getButtonProps, getDisclosureprops, onClose, isOpen } =
    useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureprops();
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();

  const dropDownAnimate: Variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  const appUserMenuRef = React.useRef<any>();
  useOutsideClick(appUserMenuRef.current!, onClose);

  return (
    <div
      className="container flex flex-row md:min-w-full min:w-full"
      ref={appUserMenuRef}
    >
      <div className="flex flex-row">
        <button {...sidebarButtonRef}>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex items-center ml-5">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-primary xs:ml-5"></span>
      </div>
      <div className="flex flex-row md:order-2 rounded-full ml-auto px-6 py-1.5">
        <button
          className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-primary md:mr-0 focus:ring-4 focus:ring-gray-100"
          {...buttonProps}
        >
          <span className="sr-only">Open user menu</span>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-primary rounded-full mr-3">
            <span className="font-medium text-gray-100">
              {fetching ? (
                <HashLoader size={20} />
              ) : (
                data?.me?.Name[0] + "" + data?.me?.Surname[0]
              )}
            </span>
          </div>
          {fetching ? (
            <HashLoader size={20} />
          ) : (
            data?.me?.Name + " " + data?.me?.Surname
          )}
          <motion.svg
            className="w-4 h-4 mx-1.5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              rotate: isOpen ? 360 : 0,
            }}
            transition={{
              duration: 0.4,
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
        </button>

        <motion.div
          className="z-50 absolute top-14 w-44 bg-white rounded-md divide-y divide-gray-100 shadow"
          animate={disclosureProps.hidden ? "closed" : "open"}
          variants={dropDownAnimate}
          transition={{
            duration: 0.2,
            type: "keyframes",
          }}
          {...disclosureProps}
        >
          <div className="py-3 px-4 text-sm text-gray-900">
            <div className="font-medium ">Pro User</div>
            <div className="truncate">{data?.me?.Email}</div>
          </div>
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="flex py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 w-full items-start self-start"
            >
              Sign out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
