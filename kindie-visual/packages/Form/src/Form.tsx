import * as React from "react";
import type { AsProp, KindiePrefixRefForwardingComponent } from "../../system";
import PropTypes from "prop-types";
import classNames from "classnames";
import FormText from "./FormText";
import FormInput from "./FormInput";
import "./__form.scss";

export interface FormOptions
  extends React.FormHTMLAttributes<HTMLFormElement>,
    AsProp {
  validated?: boolean;
}

const propTypes = {
  _ref: PropTypes.any,
  validate: PropTypes.bool,
  as: PropTypes.elementType,
};

export const Form: KindiePrefixRefForwardingComponent<"form", FormOptions> =
  React.forwardRef<HTMLFormElement, FormOptions>(
    ({ className, validated, as: Component = "form", ...props }, ref) => (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, validated && "was-validated")}
      />
    )
  );

Form.displayName = "Form";
Form.propTypes = propTypes as unknown;

export default Object.assign(Form, {
  Text: FormText,
  Input: FormInput,
});
