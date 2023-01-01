import Button from "../../ui/Button";
import { KindieArrow } from "../../ui/Icons";
import { motion } from "framer-motion";
import React from "react";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div
      className="flex flex-row p-24 bg-primary xs:justify-center xs:items-center
           md:flex-row xs:flex-col-reverse sm:flex-col-reverse"
    >
      <motion.div
        initial="hidden"
        animate="visible"
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
        className="mr-auto w-full xs:w-full md:w1/2 md:p-5 sm:w-full mt-20"
      >
        <motion.h1
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          className="text-4xl font-bold text-secondary"
        >
          Kindie, <br />
          the way to organize your kindergarden.
        </motion.h1>
        <motion.p
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          className="text-xl mt-5 text-secondary"
        >
          Kindie is a great way to help you organize your ways,
          <br /> while working with children.
          <br /> It also help you to comunicate with parents and <br /> track
          and plan activities for your kindergarden.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
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
          <Button className="flex flex-row items-center w-48 text-primary bg-secondary text-xl rounded-full px-5 py-4 text-center mt-10 hover:text-white hover:bg-transparent transition-all hover:scale-125">
            <span>Get started</span>
            <KindieArrow />
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
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
        className="block w-1/2 ml-auto mb-0 xs:hidden mt-24 lg:block sm:hidden xl:block md:hidden md:w-full md:ml-auto sm:ml-0 sm:mb-10 xs:mb-10 sm:w-full xs:w-full"
      >
        <motion.img
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          src="/HeroSvg.svg"
        />
      </motion.div>
    </div>
  );
};
