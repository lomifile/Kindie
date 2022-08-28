import BeatLoader from "react-spinners/BeatLoader";
import React from "react";
import classNames from "classNames";

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
        "p-2 rounded-lg hover:cursor-pointer",
        isLoading && " opacity-[50%]",
        active && " opacity-[50%]"
      )}
      {...props}
    >
      {isLoading ? (
        <div className="flex">
          Loading
          <BeatLoader className="ml-2" color="white" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
