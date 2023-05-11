import PropTypes from "prop-types";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import TaskInteractionForm from "../TaskInteractionForm";
import Modal from "../Modal";
import s from "./TaskPreview.module.scss";

const TaskPreview = ({
  task,
  setActiveTask,
}) => (
  <div className={s["task-preview"]}>
    <button onClick={setActiveTask} className={s["task-preview__content"]}>
      <h3 className={s["task-preview__content__title"]}>{task.title}</h3>
      <p className={s["task-preview__content__text"]}>
        {task.subtasks.length > 0
          ? `${task.checkedSubtasks.length} of ${task.subtasks.length} subtasks`
          : `Status: ${task.status}`}
      </p>
    </button>
    <Modal>
      <button className={s["task-preview__open-review"]}>
        <View />
      </button>
      <div className={s["task-review"]}>
        <h2 className={s["task-review__title"]}>{task.title}</h2>
        <TaskInteractionForm task={task} />
      </div>
    </Modal>
  </div>
);

TaskPreview.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  setActiveTask: PropTypes.func,
};

export default TaskPreview;
