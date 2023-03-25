import { useCallback, useEffect } from "react";
import Modal from "./Modal";

const ModalContainer = ({modalStatus, resetModal, closeModal, children }) => {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape" && modalStatus === "show") resetModal();
    },
    [resetModal, modalStatus]
  );

  const handleContentClick = (e) => e.stopPropagation();

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
      onContentClick={handleContentClick}
      onContentAnimationEnd={handleResetModal}
      children={children}
    />
  );
};

export default ModalContainer;
