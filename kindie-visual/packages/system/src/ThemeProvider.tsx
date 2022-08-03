import * as React from "react";

export const DEFAULT_BREAKPOINTS = ["xxl", "xl", "lg", "md", "sm", "xs"];
export const DEFAULT_MIN_BREAKPOINT = "xs";

export interface ThemeContextValue {
  prefixes: Record<string, string>;
  breakpoints: string[];
  minBreakpoint?: string;
  dir?: string;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT,
});

export const useKindiePrefix = <
  TPrefix,
  TFirstPrefix extends keyof TPrefix | string
>(
  prefix: TPrefix,
  defaultPrefix: TFirstPrefix
) => {
  const { prefixes } = React.useContext(ThemeContext);
  return (prefix ||
    prefixes[defaultPrefix as string] ||
    defaultPrefix) as string;
};
