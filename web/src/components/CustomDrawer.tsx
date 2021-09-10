import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { DrawerTypes } from "../utils/types";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  header?: JSX.Element | any;
  size?: DrawerTypes;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  header,
  children,
  onClose,
  isOpen,
  size,
  ...props
}) => {
  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpen}
      size={size}
      {...props}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
