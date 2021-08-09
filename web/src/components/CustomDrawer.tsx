import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  header?: JSX.Element | any;
  size?: string;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  header,
  children,
  onClose,
  isOpen,
  size = "md",
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
