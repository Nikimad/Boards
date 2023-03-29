import useModal from "../../hooks/useModal";
import useStateDepAction from "../../hooks/useStateDepAction";
import { addTask } from "../../models/tasks/tasksSlice";
import getId from "../../helpers/getId";
import AddTask from "./AddTask";

const addTaskContainer = () => {
  const { showModal, ...modalProps } = useModal();
  const dispatchStateDepAddTask = useStateDepAction(addTask);

  const handleAddTask = (values) => {
    dispatchStateDepAddTask({ id: getId(), ...values });
    modalProps.resetModal();
  };

  return <AddTask {...{ showModal, modalProps }} onSubmit={handleAddTask} />;
};

export default addTaskContainer;
