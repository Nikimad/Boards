import TaskFormModal from "./TaskFormModal";
import { addTask } from "../../models/tasks/tasksSlice";
import useForm from "../../hooks/useForm";
import useFormModal from "../../hooks/useFormModal";
import getId from "../../helpers/getId";
import requiredValidator from "../../helpers/requiredValidator";

const TaskFormModalContainer = ({ modalStatus, resetModal, closeModal }) => {
  const [state, changeForm, resetForm, validateForm] = useForm({
    fields: {
      title: "",
    },
    validators: {
      title: [requiredValidator()],
    },
  });

  const [submit, reset] = useFormModal(
    state.isValid,
    resetForm,
    resetModal,
    addTask({
      id: getId(),
      ...state.fields,
    })
  );

  return (
    <TaskFormModal
      state={state}
      onChange={changeForm}
      onSubmitCapture={validateForm}
      onSubmit={submit}
      modalStatus={modalStatus}
      onReset={reset}
      onClose={closeModal}
    />
  );
};

export default TaskFormModalContainer;
