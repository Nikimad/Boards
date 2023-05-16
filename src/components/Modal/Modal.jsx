import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "./Modal.module.scss";

const modalEl = document.getElementById("modal");

const Modal = ({
  modalStatus,
  resetModal,
  onContentClick,
  onContentAnimationEnd,
  children,
}) =>
  createPortal(
    modalStatus === "close" ? null : (
      <div
        className={s.modal}
        data-status={modalStatus}
        onClick={resetModal}
        onAnimationEnd={onContentAnimationEnd}
      >
        <div className={s.modal__content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    ),
    modalEl
  );

Modal.propTypes = {
  modalStatus: PropTypes.string,
  resetModal: PropTypes.func,
  onContentClick: PropTypes.func,
  onContentAnimationEnd: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Modal;
