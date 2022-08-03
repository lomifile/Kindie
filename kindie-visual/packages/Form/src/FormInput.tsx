import {
  KindiePrefixProps,
  KindiePrefixRefForwardingComponent,
  useKindiePrefix,
} from "../../system";
import warning from "warning";
import Feedback from "./Feedback";
import { useContext } from "react";
import classNames from "classnames";
import FormContext from "./FormContext";
import * as React from "react";
import PropTypes from "prop-types";
import "./_scss/_form-input.scss";

type FormInputElement = HTMLInputElement | HTMLTextAreaElement;

export interface FormInputOptions
  extends KindiePrefixProps,
    React.HTMLAttributes<FormInputElement> {
  htmlSize?: number;
  size?: "sm" | "lg";
  plainText?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  value?: string | string[] | number;
  onChange?: React.ChangeEventHandler<FormInputElement> | undefined;
  type?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  bsPrefix: PropTypes.string,
  _ref: PropTypes.any,
  size: PropTypes.string,
  htmlSize: PropTypes.number,
  as: PropTypes.elementType,
  plaintext: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

const FormInput: KindiePrefixRefForwardingComponent<"input", FormInputOptions> =
  React.forwardRef<FormInputElement, FormInputOptions>(
    (
      {
        prefix,
        type,
        size,
        htmlSize,
        id,
        className,
        isValid = false,
        isInvalid = false,
        plainText,
        readOnly,
        as: Component = "input",
        ...props
      },
      ref
    ) => {
      const controlId = useContext(FormContext);
      prefix = useKindiePrefix(prefix as string, "form-input");

      let classes;
      if (plainText) {
        classes = { [`${prefix}-plaintext`]: true };
      } else {
        classes = {
          [prefix as string]: true,
          [`${prefix}-${size}`]: size,
        };
      }

      warning(
        controlId === null || !id,
        "`controlId` ignored on `FormInput` when `id` is spcifed"
      );

      return (
        <Component
          {...props}
          type={type}
          size={htmlSize}
          ref={ref}
          readOnly={readOnly}
          id={id || controlId}
          className={classNames(
            className,
            classes,
            isValid && `is-valid`,
            isInvalid && `is-invalid`,
            type === "color" && `${prefix}-color`
          )}
        />
      );
    }
  );

FormInput.displayName = "FormInput";
FormInput.propTypes = propTypes;
export default Object.assign(FormInput, { Feedback });
