import TaskPreview from "./TaskPreview";
import useAction from "../../hooks/useAction";
import { setActiveTaskId } from "../../models/tasks/tasksSlice";

const TaskPreviewContainer = ({ task }) => {
  const dispatchSetActiveTaskId = useAction(setActiveTaskId);
  const setActiveTask = () => dispatchSetActiveTaskId(task.id);

  return (
    <TaskPreview
      {...{
        ...task,
        setActiveTask,
      }}
    />
  );
};

export default TaskPreviewContainer;
