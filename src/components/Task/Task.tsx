import type { ReactNode } from "react";
import type { Task as TaskType } from "../../types";
import s from "./Task.module.scss";

interface TaskProps {
  task: TaskType;
  onBack: () => void;
  children?: ReactNode;
}

const Task = ({ task, onBack, children }: TaskProps) => (
  <div className={s.task}>
    {task.description.length > 0 ? (
      <p className={s.task__description}>{task.description}</p>
    ) : null}
    { children }
    <button className={s.task__button} onClick={onBack}>
      Back
    </button>
  </div>
);

export default Task;
