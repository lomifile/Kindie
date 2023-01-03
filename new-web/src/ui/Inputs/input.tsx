import { FieldHookConfig, useField } from "formik";
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> & {
    label?: string;
    name?: string;
    textArea?: string;
    className?: string;
  };

export const Input = ({
  label,
  name,
  textArea,
  size: _,
  className,
  ...props
}: InputProps) => {
  const [field, { error }] = useField({ name });
  const errorFill =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5";
  const normalFill =
    "bg-gray-100 border border-gray-300 text-accent text-sm rounded-lg focus:outline-primary focus:ring-primary focus:border-primary block w-full p-2.5";
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-accent">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`${error ? errorFill : normalFill}`}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      ) : null}
    </div>
  );
};
