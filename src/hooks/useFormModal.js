import { useEffect } from "react";

const useFormModal = (
  validate,
  isValid,
  resetForm,
  resetModal,
  dispatchAction
) => {
  const submit = (e) => {
    e.preventDefault();
    validate();
  };

  const reset = () => {
    resetForm();
    resetModal();
  };

  useEffect(() => {
    if (isValid) {
      dispatchAction();
      reset();
    }
  }, [isValid]);

  return [reset, submit];
};

export default useFormModal;
