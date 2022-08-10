import * as React from "react";
import { useCallbackRef } from "./useCallbackRef";
import { useControllableProp } from "./useControllable";
import { useId } from "./useId";

interface UseDisclosureoptions {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
  id?: string;
}

export type FunctionArguments<T extends Function> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

export const useDisclosure = (props: UseDisclosureoptions = {}) => {
  const {
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    id: idProp,
  } = props;

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpenState, setIsOpen] = React.useState(props.defaultIsOpen || false);
  const [isControlled, isOpen] = useControllableProp(isOpenProp, isOpenState);

  const id = useId(idProp, "disclosure");

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef?.();
  }, [isControlled, onClosePropCallbackRef]);

  const onOpen = React.useCallback(() => {
    if (!isControlled) setIsOpen(true);
    onOpenPropCallbackRef?.();
  }, [isControlled, onOpenPropCallbackRef]);

  const onToggle = React.useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps: (props: any = {}) => ({
      ...props,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onclick: callAllHandlers(props.onClick, onToggle),
    }),
    getDisclosureprops: (props: any = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  };
};

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: FunctionArguments<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
