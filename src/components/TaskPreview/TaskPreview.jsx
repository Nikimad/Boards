import PropTypes from "prop-types";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import TaskInteractionForm from "../TaskInteractionForm";
import Modal from "../Modal";
import s from "./TaskPreview.module.scss";

const TaskPreview = ({
  id,
  title,
  status,
  subtasks,
  checkedSubtasks,
  setActiveTask,
}) => (
  <div className={s["task-preview"]}>
    <button onClick={setActiveTask} className={s["task-preview__content"]}>
      <h3 className={s["task-preview__content__title"]}>{title}</h3>
      <p className={s["task-preview__content__text"]}>
        {subtasks.length > 0
          ? `${checkedSubtasks.length} of ${subtasks.length} subtasks`
          : `Status: ${status}`}
      </p>
    </button>
    <Modal>
      <button className={s["task-preview__open-review"]}>
        <View />
      </button>
      <div className={s["task-review"]}>
        <h2 className={s["task-review__title"]}>{title}</h2>
        <TaskInteractionForm id={id} status={status} subtasks={subtasks} checkedSubtasks={checkedSubtasks} />
      </div>
    </Modal>
  </div>
);

TaskPreview.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.string,
  subtasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  setActiveTask: PropTypes.func,
};

export default TaskPreview;
