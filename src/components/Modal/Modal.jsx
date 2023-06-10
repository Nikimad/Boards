import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.scss";

const modalEl = document.getElementById("modal");

const Modal = ({
  modalStatus,
  resetModal,
  stopPropagation,
  onContentAnimationEnd,
  children,
}) =>
  createPortal(
    <div
      className={s.modal}
      data-status={modalStatus}
      onClick={resetModal}
      onAnimationEnd={onContentAnimationEnd}
    >
      <div
        className={s.modal__content}
        onClick={stopPropagation}
        onAnimationEnd={stopPropagation}
      >
        {children}
      </div>
    </div>,
    modalEl
  );

Modal.propTypes = {
  modalStatus: PropTypes.string,
  resetModal: PropTypes.func,
  stopPropagation: PropTypes.func,
  onContentAnimationEnd: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Modal;
