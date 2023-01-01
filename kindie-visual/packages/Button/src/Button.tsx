import React from "react";
import {
  KindiePrefixProps,
  KindiePrefixRefForwardingComponent,
} from "../../system/src";
import ButtonSpinner from "./Button-Spinner";
import { useButtonProps, ButtonProps } from "@restart/ui/Button";
import "./_button.scss";
import { ButtonTypes } from "./types";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useKindiePrefix } from "../../system/src/ThemeProvider";

export interface ButtonOptions
  extends ButtonProps,
    Omit<KindiePrefixProps, "as"> {
  active?: boolean;
  variant?: ButtonTypes;
  isLoading?: boolean;
  loadingText?: string;
  color?: string;
}

export type CommonButtonProps = "href" | "variant" | "disabled";

const propsTypes = {
  kindiePrefix: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset", null]),
  as: PropTypes.elementType,
};

const defaultProps = {
  variant: "fill-primary" as ButtonTypes,
  active: false,
  disabled: false,
  isLoading: false,
};

const Button: KindiePrefixRefForwardingComponent<"button", ButtonOptions> =
  React.forwardRef<HTMLButtonElement, ButtonOptions>(
    ({ as, prefix, variant, active, className, isLoading, ...props }, ref) => {
      const componenetPrefix = useKindiePrefix(prefix, "btn");
      const [buttonProps, { tagName }] = useButtonProps({
        tagName: as,
        ...props,
      });

      const Componenet = tagName as React.ElementType;

      if (isLoading) {
        props.disabled = true;
        return (
          <Componenet
            {...buttonProps}
            {...props}
            ref={ref}
            className={classNames(
              className,
              componenetPrefix,
              variant && `${componenetPrefix}-${variant}`,
              active && "active",
              props.href && props.disabled && "disabled"
            )}
          >
            <ButtonSpinner loadingText={props.loadingText} />
          </Componenet>
        );
      }

      return (
        <Componenet
          {...buttonProps}
          {...props}
          ref={ref}
          className={classNames(
            className,
            componenetPrefix,
            variant && `${componenetPrefix}-${variant}`,
            active && "active",
            props.href && props.disabled && "disabled"
          )}
        />
      );
    }
  );

Button.displayName = "Button";
Button.propTypes = propsTypes;
Button.defaultProps = defaultProps;

export default Button;
