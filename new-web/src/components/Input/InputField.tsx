import React, { InputHTMLAttributes } from "react";
import { Form, Input } from "antd";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textArea?: boolean;
};
export const InputField: React.FC<InputFieldProps> = ({
  label,
  textArea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <Form.Item label={label} htmlFor={field.name}>
      <Input
        style={{ borderRadius: "12px" }}
        {...field}
        {...props}
        status={error ? "error" : undefined}
        id={field.name}
      />
    </Form.Item>
  );
};
