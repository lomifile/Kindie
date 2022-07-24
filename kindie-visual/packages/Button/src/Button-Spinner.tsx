import React from "react";
import PropTypes from "prop-types";
import * as ReactSpinners from "react-spinners";
import { KindiePrefixProps } from "../../system";

export interface ButtonSpinnerOptions
  extends KindiePrefixProps,
    React.HTMLAttributes<HTMLElement> {
  loadingText?: string;
  color?: string;
}

const propTypes = {
  loadingText: PropTypes.string,
  color: PropTypes.string,
  prefix: PropTypes.string,
};

const defaultProps = {
  loadingText: "Loading...",
  color: "white",
};

const ButtonSpinner = React.forwardRef<HTMLDivElement, ButtonSpinnerOptions>(
  ({ prefix, className, color, loadingText, ...props }, ref) => {
    return (
      <div className="loading-div" ref={ref} {...props}>
        {loadingText}
        <ReactSpinners.BeatLoader className="loader" color={color} size={10} />
      </div>
    );
  }
);

ButtonSpinner.displayName = "ButtonSpinner";
ButtonSpinner.propTypes = propTypes;
ButtonSpinner.defaultProps = defaultProps;

export default ButtonSpinner;
