import TaskPreview from "./TaskPreview";
import { useLocation } from "react-router";
import type { Task } from "../../types";

interface TaskPreviewContainerProps {
  task: Task;
}

const TaskPreviewContainer = ({ task }: TaskPreviewContainerProps) => {
  const location = useLocation();

  return (
    <TaskPreview
      task={task}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default TaskPreviewContainer;
