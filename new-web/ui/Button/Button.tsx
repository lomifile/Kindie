import BeatLoader from "react-spinners/BeatLoader";
import React from "react";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  isLoading?: boolean;
  active?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  active,
  isLoading,
  children,
  className,
  ...props
}) => {
  if (isLoading) props.disabled = true;
  return (
    <button
      className={`p-2 rounded-lg ${
        isLoading || active ? "hover:cursor-none" : "hover:cursor-pointer"
      } ${isLoading ? "opacity-[50%]" : ""}
      ${active ? " opacity-[50%]" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex flex-row justify-between items-center">
          Loading
          <BeatLoader color="white" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};
