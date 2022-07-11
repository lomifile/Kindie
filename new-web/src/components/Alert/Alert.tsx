import { Alert as AntAlert } from "antd";
import React from "react";

interface AlertProps {
  title?: string;
  text?: string;
  type?: "warning" | "success" | "info" | "error" | undefined;
}

export const Alert: React.FC<AlertProps> = ({ title, text, type }) => {
  return (
    <AntAlert
      message={title}
      description={text}
      type={type}
      showIcon
      closable
    />
  );
};
