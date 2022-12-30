import { motion } from "framer-motion";
import * as React from "react";

interface FeaturesBoxProps extends React.HTMLAttributes<HTMLElement> {
  imgSrc?: string;
  imgPosition?: "left" | "right";
  title?: string;
}

export const FeaturesBox = ({
  imgSrc,
  imgPosition = "left",
  title,
  children,
  ...props
}: FeaturesBoxProps) => {
  return (
    <motion.div
      className={`flex flex-row w-full h-full items-center ${
        imgPosition === "right" ? "justify-end" : ""
      }`}
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
      {imgPosition === "left" && imgSrc ? (
        <motion.img
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          src={imgSrc}
          className="w-1/2 h-1/2 "
          alt="1"
        />
      ) : null}
      <div className="flex flex-col w-1/3">
        <h5 className="mb-4 mt-4 text-xl font-medium text-black">{title}</h5>
        <span className="text-base font-normal leading-tight text-accent">
          {children}
        </span>
      </div>
      {imgPosition === "right" && imgSrc ? (
        <motion.img
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          src={imgSrc}
          className="w-1/2 h-1/2 "
          alt="1"
        />
      ) : null}
    </motion.div>
  );
};
