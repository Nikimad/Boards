import BoardFormModal from "./BoardFormModal";
import { addBoard } from "../../models/boards/boardsSlice";
import useAction from "../../hooks/useAction";
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

  const [reset, submit] = useFormModal(
    validateForm,
    state.isValid,
    resetForm,
    resetModal,
    useAction(
      addBoard({
        id: getId(),
        ...state.fields,
      })
    )
  );

  return (
    <BoardFormModal
      state={state}
      onChange={changeForm}
      onSubmit={submit}
      modalStatus={modalStatus}
      onReset={reset}
      onClose={closeModal}
    />
  );
};

export default BoardFormModalContainer;
