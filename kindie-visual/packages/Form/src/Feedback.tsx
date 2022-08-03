import classNames from "classnames";
import * as React from "react";
import PropTypes from "prop-types";
import { AsProp, KindiePrefixRefForwardingComponent } from "../../system";

export type FeedbackType = "valid" | "invalid";

export interface FeedbackOptions
  extends AsProp,
    React.HTMLAttributes<HTMLElement> {
  kindiePrefix?: never;
  type?: FeedbackType;
  tooltip?: boolean;
}

const propTypes = {
  type: PropTypes.string,
  tooltip: PropTypes.bool,
  as: PropTypes.elementType,
};

const Feedback: KindiePrefixRefForwardingComponent<"div", FeedbackOptions> =
  React.forwardRef<HTMLElement, FeedbackOptions>(
    (
      {
        as: Component = "div",
        className,
        type = "valid",
        tooltip = false,
        ...props
      },
      ref
    ) => (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          `${type}-${tooltip ? "tooltip" : "feedback"}`
        )}
      />
    )
  );

Feedback.displayName = "Feedback";
Feedback.propTypes = propTypes;

export default Feedback;
