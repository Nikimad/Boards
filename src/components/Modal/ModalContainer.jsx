import { Children, cloneElement, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";
import Modal from "./Modal";

const ModalContainer = ({ children }) => {
  const { modalStatus, resetModal, closeModal } = useModal();

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

  const [FormOrigin, ...otherContentOrigin] = Children.toArray(children);

  const Form = cloneElement(FormOrigin, {
    ...FormOrigin.props,
    onSubmit: (e) => {
      if (FormOrigin.props.onSubmit) FormOrigin.props.onSubmit(e);
      resetModal();
    },
    onReset: (e) => {
      if (FormOrigin.props.onReset) FormOrigin.props.onReset(e);
      resetModal();
    },
  });

  return (
    <Modal
      modalStatus={modalStatus}
      resetModal={resetModal}
      stopPropagation={handleStopPropagation}
      onContentAnimationEnd={handleResetModal}
    >
      {...otherContentOrigin}
      {Form}
    </Modal>
  );
};

ModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default ModalContainer;
