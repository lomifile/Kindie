import { motion } from "framer-motion";
import React from "react";

export const Register = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-primary">
      <div className="flex flex-col w-1/2 h-screen items-center justify-center">
        {/* <h1 className="p-10 text-2xl text-gray-100">
          Welcome, new Kindie user!
        </h1>
        <span className="p-10 text-xl text-gray-100">
          We are happy to see you joining Kindie family!
        </span> */}
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
      </motion.div>
    </div>
  );
};
