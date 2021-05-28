import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

interface ChildrenModalProps {
  onClose: () => void;
  isOpen: boolean;
  child: any;
}

export const ChildrenModal: React.FC<ChildrenModalProps> = ({
  onClose,
  isOpen,
  child,
}) => {
  const { t } = useTranslation("data", { useSuspense: false });
  return (
    <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("children.modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>
              {t("children.modal.name")}: {child?.Name}
            </Text>
            <Text>
              {t("children.modal.surname")}: {child?.Surname}
            </Text>
            <Text>
              {t("children.modal.birth-date")}:{" "}
              {moment(child?.BirthDate).format("DD.MM.YYYY")}
            </Text>
            <Text>
              {t("children.modal.oib")}: {child?.OIB}
            </Text>
            <Text>
              {t("children.modal.gender")}: {child?.Gender}
            </Text>
            <Text>
              {t("children.modal.remarks")}: {child?.Remarks}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{t("children.modal.btn")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
