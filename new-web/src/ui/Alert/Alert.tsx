import React, { HTMLAttributes } from "react";
import { Danger } from "./Danger";
import { Info } from "./Info";
import { Success } from "./Success";
import { Warning } from "./Warning";

interface AlertProps extends HTMLAttributes<HTMLElement> {}

const Alert: React.FC<AlertProps> = () => null;

export default Object.assign(Alert, {
  Danger,
  Info,
  Success,
  Warning,
});
