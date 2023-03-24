import BoardFormModal from "./BoardFormModal";
import { addBoard } from "../../models/boards/boardsSlice";
import useForm from "../../hooks/useForm";
import useFormModal from "../../hooks/useFormModal";
import getId from "../../helpers/getId";
import requiredValidator from "../../helpers/requiredValidator";
import lengthValidator from "../../helpers/lengthValidator";

const BoardFormModalContainer = ({ modalStatus, resetModal, closeModal }) => {
  const [state, changeForm, resetForm, validateForm] = useForm({
    fields: {
      title: "",
    },
    validators: {
      title: [requiredValidator(), lengthValidator(5, 10)],
    },
  });

  const [submit, reset] = useFormModal(
    state.isValid,
    resetForm,
    resetModal,
    addBoard({
      id: getId(),
      ...state.fields,
    })
  );

  return (
    <BoardFormModal
      state={state}
      onChange={changeForm}
      onSubmitCapture={validateForm}
      onSubmit={submit}
      onAfterSubmit={validateForm}
      modalStatus={modalStatus}
      onReset={reset}
      onClose={closeModal}
    />
  );
};

export default BoardFormModalContainer;
