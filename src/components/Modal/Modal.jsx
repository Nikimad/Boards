import { createPortal } from "react-dom";
import "./Modal.scss";

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
      <div className="modal" data-status={modalStatus} onClick={resetModal}>
        <div
          className="modal__content"
          onClick={onContentClick}
          onAnimationEnd={onContentAnimationEnd}
        >
          {children}
        </div>
      </div>
    ),
    modalEl
  );

export default Modal;
