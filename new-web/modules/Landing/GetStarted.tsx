import { motion } from "framer-motion";
import React from "react";
import Button from "../../ui/Button";
import { KindieArrow } from "../../ui/Icons";

export const GetStarted = () => {
  return (
    <motion.div className="flex flex-col justify-center items-center w-full p-20 bg-accent">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
          },
        }}
        className="text-4xl text-gray-100 uppercase font-bold mb-10"
      >
        Start using kindie now
      </motion.h2>
      <motion.span
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
          },
        }}
        className="text-gray-100 text-xl break-all"
      >
        Start using Kindie and focus on your job rather than boring
        administration work.
      </motion.span>
      <motion.span
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
          },
        }}
        className="text-gray-100 text-xl break-all"
      >
        Focus on what you love and enjoy the beautifull moments with children
      </motion.span>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 1, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <Button className="flex flex-row items-center w-48 text-accent bg-secondary text-xl rounded-full px-5 py-4 text-center mt-10 hover:text-white hover:bg-transparent transition-all hover:scale-125">
          <span>Get started</span>
          <KindieArrow />
        </Button>
      </motion.div>
    </motion.div>
  );
};
