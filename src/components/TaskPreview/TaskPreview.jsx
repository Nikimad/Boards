import PropTypes from "prop-types";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import TaskInteractionForm from "../TaskInteractionForm";
import Modal from "../Modal";
import s from "./TaskPreview.module.scss";

const TaskPreview = ({ task, setActiveTask }) => (
  <div className={s.taskpreview}>
    <button onClick={setActiveTask} className={s.taskpreview__content}>
      <h3 className={s.taskpreview__content__title}>{task.title}</h3>
      <p className={s.taskpreview__content__text}>
        {task.subtasks.length > 0
          ? `${task.checkedSubtasks.length} of ${task.subtasks.length} subtasks`
          : `Status: ${task.status}`}
      </p>
    </button>
    <Modal>
      <button className={s.taskpreview__openreview}>
        <View />
      </button>
      <div className={s.taskreview}>
        <h2 className={s.taskreview__title}>{task.title}</h2>
        <TaskInteractionForm task={task} />
      </div>
    </Modal>
  </div>
);

TaskPreview.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  setActiveTask: PropTypes.func,
};

export default TaskPreview;
