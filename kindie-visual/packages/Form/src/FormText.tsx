import * as React from "react";
import PropTypes from "prop-types";
import {
  KindiePrefixProps,
  KindiePrefixRefForwardingComponent,
  useKindiePrefix,
} from "../../system";
import classNames from "classnames";

export interface FormTextOptions
  extends KindiePrefixProps,
    React.HTMLAttributes<HTMLElement> {
  kindiePrefix?: string;
  muted?: boolean;
}

const propTypes = {
  kindiePrefix: PropTypes.string,
  _ref: PropTypes.any,
  muted: PropTypes.bool,
  as: PropTypes.elementType,
};

const FormText: KindiePrefixRefForwardingComponent<"small", FormTextOptions> =
  React.forwardRef<HTMLElement, FormTextOptions>(
    (
      { kindiePrefix, className, as: Componenet = "small", muted, ...props },
      ref
    ) => {
      kindiePrefix = useKindiePrefix(kindiePrefix, "form-text");

      return (
        <Componenet
          {...props}
          ref={ref}
          className={classNames(className, kindiePrefix, muted && "text-muted")}
        />
      );
    }
  );

FormText.displayName = "FormText";
FormText.propTypes = propTypes;

export default FormText;
