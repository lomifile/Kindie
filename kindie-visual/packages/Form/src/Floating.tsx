import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AsProp,
  KindiePrefixRefForwardingComponent,
  useKindiePrefix,
} from "../../system";
import "./_scss/_floating.scss";

export interface FloatingOptions
  extends AsProp,
    React.HTMLAttributes<HTMLElement> {
  controlId?: string;
  label?: React.ReactNode;
}

const propTypes = {
  as: PropTypes.elementType,
  conrtrolId: PropTypes.string,
  label: PropTypes.node.isRequired,
};

const Floating: KindiePrefixRefForwardingComponent<"div", FloatingOptions> =
  React.forwardRef<HTMLElement, FloatingOptions>(
    (
      {
        className,
        prefix,
        children,
        as: Component = "div",
        label,
        controlId,
        ...props
      },
      ref
    ) => {
      prefix = useKindiePrefix(prefix, "floating" as string);

      return (
        <Component
          ref={ref}
          className={classNames(className, prefix)}
          {...props}
        >
          {children}
          <label htmlFor={controlId}>{label}</label>
        </Component>
      );
    }
  );

Floating.displayName = "Floating";
Floating.propTypes = propTypes;

export default Floating;
