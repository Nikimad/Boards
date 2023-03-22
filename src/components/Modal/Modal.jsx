import { createPortal } from "react-dom";
import "./Modal.scss";

const modalEl = document.getElementById("modal");

const Modal = ({ status, onReset, onContentClick, children }) =>
  createPortal(
    status === "close" ? null : (
      <div className="modal" data-status={status} onClick={onReset}>
        <div className="modal__content" onClick={onContentClick}>
          {children}
        </div>
      </div>
    ),
    modalEl
  );

export default Modal;
