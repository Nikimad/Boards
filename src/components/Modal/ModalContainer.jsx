import { Children, cloneElement, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const ModalContainer = ({ modalProps, children }) => {
  const { modalStatus, resetModal, closeModal } = modalProps;

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") resetModal();
    },
    [resetModal]
  );

  const handleStopPropagation = (e) => e.stopPropagation();

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

ModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default ModalContainer;
