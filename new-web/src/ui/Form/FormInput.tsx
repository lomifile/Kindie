import { useField } from "formik";
import { BiErrorCircle } from "react-icons/bi";
import * as React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label
        className="block mb-2 text-lg font-medium text-gray-900"
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary my-2 block w-full p-2.5 outline-none"
        {...props}
        {...field}
        id={field.name}
      />
      {error ? (
        <div className="flex flex-row">
          <BiErrorCircle
            style={{ color: "rgb(220 38 38)", marginTop: "5px" }}
          />
          <span className="text-red-600">Test error</span>
        </div>
      ) : null}
    </div>
  );
};
