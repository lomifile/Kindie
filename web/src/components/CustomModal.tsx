import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  toast,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: JSX.Element | string | any;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  header,
  children,
  ...props
}) => {
  return (
    <Modal
      onClose={onClose}
      size={"md"}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      {...props}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
