import { useState } from "react";

const useModal = () => {
  const [modalStatus, setModalStatus] = useState("close");
  const resetModal = () => setModalStatus("reset");
  const showModal = () => setModalStatus("show");
  const closeModal = () => setModalStatus("close");

  return { modalStatus, showModal, resetModal, closeModal };
};

export default useModal;
