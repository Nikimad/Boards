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

  useEffect(() => {
    let timeout;
    if (status === "reset") {
      timeout = setTimeout(onClose, 200);
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, status, handleEscape]);

  return (
    <Modal
      status={status}
      onReset={onReset}
      onContentClick={handleContentClick}
      children={children}
    />
  );
};

export default ModalContainer;
