import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ParentCard } from "./ParentCard";

interface ParentsModalProps {
  data: any;
  onClose: () => void;
  isOpen: boolean;
}

export const ParentsModal: React.FC<ParentsModalProps> = ({
  data,
  onClose,
  isOpen,
}) => {
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("children.modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ParentCard layout={false} data={data} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t("children.modal.btn")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
