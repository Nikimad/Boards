import { createPortal } from "react-dom";
import type { AnimationEventHandler, ReactNode, SyntheticEvent } from "react";
import s from "./Modal.module.scss";

// #modal is a static element in index.html
const modalEl = document.getElementById("modal")!;

interface ModalProps {
  modalStatus: string;
  resetModal: () => void;
  stopPropagation: (e: SyntheticEvent) => void;
  onContentAnimationEnd: AnimationEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const Modal = ({
  modalStatus,
  resetModal,
  stopPropagation,
  onContentAnimationEnd,
  children,
}: ModalProps) =>
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

export default Modal;
