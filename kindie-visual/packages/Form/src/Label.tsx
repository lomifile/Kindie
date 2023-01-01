import * as React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import {
  KindiePrefixProps,
  KindiePrefixRefForwardingComponent,
  useKindiePrefix,
} from "../../system";
import classNames from "classnames";
import warning from "warning";

export interface LabelOptions
  extends KindiePrefixProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  visuallyHidden?: boolean;
}

const propTypes = {
  prefix: PropTypes.string,
  htmlFor: PropTypes.string,
  _ref: PropTypes.any,
  visuallyHidden: PropTypes.bool,
};

const Label: KindiePrefixRefForwardingComponent<"label", LabelOptions> =
  React.forwardRef<HTMLLabelElement, LabelOptions>(
    (
      {
        as: Component = "label",
        prefix,
        visuallyHidden,
        className,
        htmlFor,
        ...props
      },
      ref
    ) => {
      const controlId = React.useContext(FormContext);
      prefix = useKindiePrefix(prefix, "input-label");

      const classes = classNames(
        className,
        prefix,
        visuallyHidden && "visually-hidden"
      );
      warning(
        controlId == null || !htmlFor,
        "`controlId` is ignored on`<FormLabel>` when `htmlFor` is specified"
      );
      htmlFor = htmlFor || (controlId as string);

      return (
        <Component ref={ref} className={classes} htmlFor={htmlFor} {...props} />
      );
    }
  );

Label.displayName = "Label";
Label.propTypes = propTypes;

export default Label;
