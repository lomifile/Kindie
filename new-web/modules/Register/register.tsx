import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import React from "react";
import Button from "../../ui/Button";
import { Input } from "../../ui/Inputs";

export const Register = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-primary">
      <div className="flex flex-col w-1/2 h-screen items-center justify-center">
        <div className="p-10 items-center">
          <img src="/loginregister.gif" alt="img" />
        </div>
      </div>
      <motion.div
        className="flex flex-col w-1/2 h-screen bg-gray-100 rounded-l-[24px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1, x: 1000 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <div className="flex flex-col items-center justify-center p-20">
          <h1 className="text-2xl font-bold items-center text-accent uppercase">
            Register
          </h1>
        </div>
        <div className="w-full justify-center items-center">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              console.log(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-2 gap-1 px-20">
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Name"
                  />
                  <Input
                    type="text"
                    name="surname"
                    label="Last name"
                    placeholder="Last name"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 px-20 py-5 items-center justify-center">
                  <Input
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Email"
                  />
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                  <Input
                    name="repeatPassword"
                    label="Repeat password"
                    placeholder="Repeat password"
                    type="password"
                  />
                  <div className="flex flex-col w-full items-center justify-center">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="mt-2 p-2 bg-primary text-gray-100 rounded-xl w-1/2 self-center font-bold"
                    >
                      Register
                    </Button>
                    <div className="flex flex-row px-20 py-5">
                      <span className="text-l text-accent">
                        Already have account?{" "}
                        <a className="text-blue-800 underline" href="/login">
                          Log in here
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};
