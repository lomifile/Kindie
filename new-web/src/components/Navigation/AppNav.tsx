import React from "react";
import { Variants, motion } from "framer-motion";
import { useDisclosure } from "../../hooks";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { HashLoader } from "react-spinners";
import router from "next/router";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AiOutlineBell } from "react-icons/ai";
import { Formik } from "formik";
import { Input } from "../../ui/Inputs";

export const AppNav = () => {
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
  const [notificationFocus, setNotificationFocus] =
    React.useState<boolean>(false);
  const appUserMenuRef = React.useRef<any>();
  useOutsideClick(appUserMenuRef.current!, onClose);

  return (
    <div
      className="container flex flex-row md:min-w-full justify-between"
      ref={appUserMenuRef}
    >
      <div className="flex flex-row items-center pl-5 w-full">
        <Formik
          initialValues={{
            text: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Input
              className="w-full"
              type="text"
              name="email"
              placeholder="Email"
            />
          )}
        </Formik>
      </div>
      <div className="flex flex-row md:order-2 rounded-full ml-auto px-6 py-1.5 w-full justify-between">
        <button
          className="flex text-accent justify-end items-center ml-auto mr-4 p-1"
          onClick={() => {
            setNotificationFocus(!notificationFocus);
          }}
        >
          {notificationFocus ? (
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="#3F3D56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00005 20C9.10005 20 10.0001 19.1 10.0001 18H6.00005C6.00005 19.1 6.89005 20 8.00005 20ZM14.0001 14V9C14.0001 5.93 12.3601 3.36 9.50005 2.68V2C9.50005 1.17 8.83005 0.5 8.00005 0.5C7.17005 0.5 6.50005 1.17 6.50005 2V2.68C3.63005 3.36 2.00005 5.92 2.00005 9V14L0.710051 15.29C0.0800514 15.92 0.520051 17 1.41005 17H14.5801C15.4701 17 15.9201 15.92 15.2901 15.29L14.0001 14Z"
                fill="#3F3D56"
                fillOpacity="1"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.00005 20C10.1001 20 11.0001 19.1 11.0001 18H7.00005C7.00005 19.1 7.89005 20 9.00005 20ZM7.00005 2C7.00005 0.893858 7.89391 0 9.00005 0C10.1062 0 11.0001 0.893858 11.0001 2V2.2973C13.8944 3.17437 15.5001 5.89023 15.5001 9V13.7929L16.6436 14.9364C17.5902 15.8831 16.9132 17.5 15.5801 17.5H2.41005C1.06625 17.5 0.417433 15.8755 1.3565 14.9364L2.50005 13.7929V9C2.50005 5.88077 4.09653 3.17294 7.00005 2.2969V2ZM9.00005 1C8.44619 1 8.00005 1.44614 8.00005 2V2.68V3.07538L7.61533 3.16653C5.02224 3.78092 3.50005 6.09437 3.50005 9V14V14.2071L3.3536 14.3536L2.0636 15.6436C1.74267 15.9645 1.97386 16.5 2.41005 16.5H15.5801C16.0269 16.5 16.2499 15.9569 15.9365 15.6436L14.6465 14.3536L14.5001 14.2071V14V9C14.5001 6.10482 12.9682 3.78076 10.3844 3.16644L10.0001 3.07506V2.68V2C10.0001 1.44614 9.55391 1 9.00005 1Z"
                fill="#3F3D56"
                fillOpacity="0.4"
              />
            </svg>
          )}
        </button>
        <button
          className="flex items-center justify-end text-sm font-medium text-gray-900 rounded-full focus:outline-none hover:text-primary md:mr-0 focus:ring-none focus:border-none"
          {...buttonProps}
        >
          <span className="sr-only">Open user menu</span>
          <div className="relative inline-flex items-center justify-center w-10 h-10 bg-primary rounded-full mr-3">
            <span className="font-medium text-gray-100">
              {fetching ? (
                <HashLoader size={20} />
              ) : (
                data?.me?.Name[0] + "" + data?.me?.Surname[0]
              )}
            </span>
            <span className="bottom-0 z-10 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white  rounded-full"></span>
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
          className="z-50 absolute top-14 right-5 w-44 bg-white rounded-md divide-y divide-gray-100 shadow"
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
                await logout({
                  variables: {} as never,
                });
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
