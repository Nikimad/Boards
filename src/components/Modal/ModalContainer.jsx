import { useCallback, useEffect } from "react";
import Modal from "./Modal";

const ModalContainer = ({ status, onReset, onClose, children }) => {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape" && status === "show") onReset();
    },
    [onReset, status]
  );
  
  const handleContentClick = (e) => e.stopPropagation();
  
  const handleResetModal = () => {
    if (status === 'reset') onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return (
    <Modal
      status={status}
      onReset={onReset}
      onContentClick={handleContentClick}
      onContentAnimationEnd={handleResetModal}
      children={children}
    />
  );
};

export default ModalContainer;
