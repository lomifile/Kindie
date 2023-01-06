import React from "react";

export const useCallbackRef = <T extends (...args: any[]) => any>(
  fn: T | undefined,
  deps: React.DependencyList = []
): T => {
  const ref = React.useRef(fn);
  return React.useCallback(((...args) => ref.current?.(args)) as T, deps);
};
