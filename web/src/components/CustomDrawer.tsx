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
  header: JSX.Element | any;
  body: JSX.Element | any;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  header,
  body,
  onClose,
  isOpen,
  ...props
}) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody>{body}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
