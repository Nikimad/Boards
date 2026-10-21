import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import type { Task as TaskType } from "../../types";
import Task from "./Task";

interface TaskContainerProps {
  task: TaskType;
  children?: ReactNode;
}

const TaskContainer = ({ task, children }: TaskContainerProps) => {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return <Task task={task} onBack={onBack} children={children} />;
};

export default TaskContainer;
