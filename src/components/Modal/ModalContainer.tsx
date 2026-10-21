import { useCallback, useEffect } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import type useModal from "../../hooks/useModal";
import Modal from "./Modal";

interface ModalContainerProps {
  modalProps: ReturnType<typeof useModal>;
  children: ReactNode;
}

const ModalContainer = ({ modalProps, children }: ModalContainerProps) => {
  const { modalStatus, resetModal, closeModal } = modalProps;

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") resetModal();
    },
    [resetModal]
  );

  const handleStopPropagation = (e: SyntheticEvent) => e.stopPropagation();

  const handleResetModal = () => {
    if (modalStatus === "reset") closeModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return (
    <Modal
      modalStatus={modalStatus}
      resetModal={resetModal}
      stopPropagation={handleStopPropagation}
      onContentAnimationEnd={handleResetModal}
      children={children}
    />
  );
};

export default ModalContainer;
