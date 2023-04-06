import { useState } from "react";

const useModal = () => {
  const [modalStatus, setModalStatus] = useState("close");
  const resetModal = () => setModalStatus("reset");
  const showModal = () => setModalStatus("show");
  const closeModal = () => setModalStatus("close");
  const toggleModal = () => modalStatus === "close" ? showModal() : resetModal();

  return { toggleModal, modalStatus, showModal, resetModal, closeModal };
};

export default useModal;
