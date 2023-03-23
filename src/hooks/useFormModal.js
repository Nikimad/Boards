import { useCallback } from "react";
import useAction from "./useAction";

const useFormModal = (
  isValid,
  resetForm,
  resetModal,
  submitAction
) => {
  const dispatchSubmitAction = useAction(submitAction);

  const reset = useCallback(() => {
    resetForm();
    resetModal();
  }, [resetForm, resetModal]);

  const submit = useCallback((e) => {
    e.preventDefault();
    if (isValid) {
      dispatchSubmitAction();
      reset();
    }
  }, [isValid, dispatchSubmitAction, reset]);

  return [submit, reset];
};

export default useFormModal;
