import useAction from "../../hooks/useAction";
import { setActiveTaskId } from "../../models/view/viewSlice";
import Task from "./Task";

const TaskContainer = ({ task }) => {
  const dispatchSetActiveTask = useAction(setActiveTaskId);
  const onBack = () => dispatchSetActiveTask(null);

  return <Task task={task} onBack={onBack} />;
};

export default TaskContainer;
