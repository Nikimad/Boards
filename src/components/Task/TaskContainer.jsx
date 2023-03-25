import useModal from "../../hooks/useModal";
import Task from "./Task";
import { useState } from "react";
import useStateDepAction from "../../hooks/useStateDepAction";
import { updateTask, removeTask } from "../../models/tasks/tasksSlice";
import useAction from "../../hooks/useAction";

const TaskContainer = ({ task }) => {
  const { id, ...taskValues } = task;
  const { showModal, resetModal, ...modalProps } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  const handleEditClick = () => setIsEdit(true);

  const dispatchStateDepUpdateTask = useStateDepAction(updateTask);
  const dispatchRemoveTask = useAction(removeTask(id));

  const resetTask = () => {
    resetModal();
    setIsEdit(false);
  };

  const handleUpdateBoard = (values) => {
    dispatchStateDepUpdateTask({ id, changes: values });
    setIsEdit(false);
  };

  const handleRemoveTask = () => {
    dispatchRemoveTask();
    removeTask();
  };

  return (
    <Task
      taskValues={taskValues}
      isEdit={isEdit}
      showModal={showModal}
      modalProps={{ ...modalProps, resetModal: resetTask }}
      onEdit={handleEditClick}
      onSubmit={handleUpdateBoard}
      onRemove={handleRemoveTask}
    />
  );
};

export default TaskContainer;
