import { motion } from "framer-motion";
import React from "react";
import { Input } from "../../ui/Inputs";
import { Form, Formik } from "formik";
import Button from "../../ui/Button";
import { useLoginMutation } from "../../generated/graphql";
import router from "next/router";
import { toErrormap } from "../../utils/toErrorMap";

export const Login = () => {
  const [, login] = useLoginMutation();
  return (
    <div className="flex flex-row w-full h-screen bg-primary">
      <div className="flex flex-col w-1/2 h-screen items-center justify-center">
        <div className="p-10 items-center">
          <img src="/loginregister.gif" alt="img" />
        </div>
      </div>
      <motion.div
        className="flex flex-col w-1/2 h-screen bg-gray-100 rounded-l-[24px] justify-center items-center"
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
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl font-bold items-center text-accent uppercase">
            Login
          </h1>
        </div>
        <div className="w-full">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                email: values.email,
                password: values.password,
              });
              if (response.data?.login.errors) {
                setErrors(toErrormap(response.data.login.errors));
              } else if (response.data?.login.user) {
                alert("Login success!");
                // if (typeof router.query.next === "string") {
                //   router.push(router.query.next);
                // } else {
                //   router.push("/dashboard");
                // }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 gap-4 px-20 py-10 items-center justify-center">
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
                  <div className="flex flex-col w-full items-center justify-center">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      className="mt-2 p-2 bg-primary text-gray-100 rounded-xl w-1/2 self-center font-bold"
                    >
                      Login
                    </Button>
                    <div className="flex flex-col px-20 py-5 justify-center items-center">
                      <a className="text-blue-800 underline" href="#">
                        Forgot password?
                      </a>
                      <span className="mt-10">
                        Don't have account?{" "}
                        <a href="/register" className="text-blue-800 underline">
                          Register here
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
