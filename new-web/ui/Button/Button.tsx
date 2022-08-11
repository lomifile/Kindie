import React from "react";
import classNames from "classNames";
import BeatLoader from "react-spinners/BeatLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  active,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "p-2 bg-primary text-secondary rounded-md hover:cursor-pointer",
        isLoading && "opacity-[50%]",
        active && "opacity-[50%]"
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex">
          Loading
          <BeatLoader className="ml-2 mt-1" color="white" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
