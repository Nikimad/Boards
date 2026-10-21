import View from "../../assets/svg/view.svg?react";
import { Link } from "react-router";
import type { PreviousLocationState, Task } from "../../types";
import s from "./TaskPreview.module.scss";

interface TaskPreviewProps {
  task: Task;
  previousLocation: PreviousLocationState;
}

const TaskPreview = ({ task, previousLocation }: TaskPreviewProps) => (
  <div className={s.taskpreview}>
    <Link to={`task/${task.id}`} className={s.taskpreview__content}>
      <h3 className={s.taskpreview__content__title}>{task.title}</h3>
      <p className={s.taskpreview__content__text}>
        {task.subtasks.length > 0
          ? `${task.checkedSubtasks.length} of ${task.subtasks.length} subtasks`
          : `Status: ${task.status}`}
      </p>
    </Link>
    <Link
      state={previousLocation}
      to={`/review/board/${task.boardId}/task/${task.id}`}
      className={s.taskpreview__openreview}
    >
      <View />
    </Link>
  </div>
);

export default TaskPreview;
