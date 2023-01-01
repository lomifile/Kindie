import classNames from "classnames";
import camelize from "dom-helpers/camelize";
import * as React from "react";
import { useKindiePrefix } from "./ThemeProvider";
import { KindiePrefixRefForwardingComponent } from "./KindieComponent";

const pascalCase = (str: string) =>
  str[0].toUpperCase() + camelize(str).slice(1);

interface KindiePrefixOptions<As extends React.ElementType = "div"> {
  displayName?: string;
  Component?: As;
  defaultProps?: Partial<React.ComponentProps<As>>;
}

export default function createWithKindiePrefix<
  As extends React.ElementType = "div"
>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component,
    defaultProps,
  }: KindiePrefixOptions<As> = {}
): KindiePrefixRefForwardingComponent<As> {
  const BsComponent = React.forwardRef(
    (
      { className, kindiePrefix, as: Tag = Component || "div", ...props }: any,
      ref
    ) => {
      const resolvedPrefix = useKindiePrefix(kindiePrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...props}
        />
      );
    }
  );
  BsComponent.defaultProps = defaultProps as any;
  BsComponent.displayName = displayName;
  return BsComponent as any;
}
