import Task from "./Task";
import useAction from "../../hooks/useAction";
import { setActiveTaskId } from "../../models/tasks/tasksSlice";

const TaskContainer = ({task}) => {
  const dispatchSetActiveTask = useAction(setActiveTaskId);
  const onBack = () => dispatchSetActiveTask(null);

  return <Task { ...{task, onBack}} />;
};

export default TaskContainer;
