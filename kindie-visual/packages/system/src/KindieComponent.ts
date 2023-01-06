import * as React from "react";
import { TransitionComponent } from "@restart/ui/types";

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;

export interface KindiePrefixOnlyProps {
  KindiePrefix?: string;
}

export interface AsProp<As extends React.ElementType = React.ElementType> {
  as?: As;
}

export interface KindiePrefixProps<
  As extends React.ElementType = React.ElementType
> extends KindiePrefixOnlyProps,
    AsProp<As> {}

export interface KindiePrefixRefForwardingComponent<
  TInitial extends React.ElementType,
  P = unknown
> {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, KindiePrefixProps<As> & P>>,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export class KindiePrefixComponent<
  As extends React.ElementType,
  P = unknown
> extends React.Component<ReplaceProps<As, KindiePrefixProps<As> & P>> {}

export type KindiePrefixComponentClass<
  As extends React.ElementType,
  P = unknown
> = React.ComponentClass<ReplaceProps<As, KindiePrefixProps<As> & P>>;

export type TransitionType = boolean | TransitionComponent;

export function getOverlayDirection(placement: string, isRTL?: boolean) {
  let bsDirection = placement;
  if (placement === "left") {
    bsDirection = isRTL ? "end" : "start";
  } else if (placement === "right") {
    bsDirection = isRTL ? "start" : "end";
  }
  return bsDirection;
}
