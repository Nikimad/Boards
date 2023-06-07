import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useModal = () => {
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState("show");
  const resetModal = () => setModalStatus("reset");
  const closeModal = () => navigate(-1);

  return { modalStatus, resetModal, closeModal };
};

export default useModal;
