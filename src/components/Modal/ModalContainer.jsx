import { useCallback, useEffect } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const ModalContainer = ({ modalStatus, resetModal, closeModal, children }) => {
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

ModalContainer.propTypes = {
  modalStatus: PropTypes.string,
  resetModal: PropTypes.func,
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default ModalContainer;
