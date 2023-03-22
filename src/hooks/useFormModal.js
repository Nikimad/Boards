import { useCallback, useEffect } from "react";

const useFormModal = (
  validate,
  isValid,
  resetForm,
  resetModal,
  dispatchAction
) => {
  const submit = useCallback((e) => {
    e.preventDefault();
    validate();
  }, [validate]);

  const reset = useCallback(() => {
    resetForm();
    resetModal();
  }, [resetForm, resetModal]);

  useEffect(() => {
    if (isValid) {
      dispatchAction();
      reset();
    }
  }, [isValid]);

  return [reset, submit];
};

export default useFormModal;
