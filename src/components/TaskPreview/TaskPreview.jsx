import "./TaskPreview.scss";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import TaskInteractionForm from "../TaskInteractionForm";
import Modal from "../Modal";
import PropTypes from "prop-types";

const TaskPreview = ({
  id,
  title,
  status,
  subtasks,
  checkedSubtasks,
  setActiveTask,
}) => (
  <div className="task-preview">
    <button onClick={setActiveTask} className="task-preview__content">
      <h3 className="task-preview__content__title">{title}</h3>
      <p className="task-preview__content__text">
        {subtasks.length > 0
          ? `${checkedSubtasks.length} of ${subtasks.length} subtasks`
          : `Status: ${status}`}
      </p>
    </button>
    <Modal>
      <button className="task-preview__open-review">
        <View />
      </button>
      <div className="task-review">
        <h2 className="task-review__title">{title}</h2>
        <TaskInteractionForm {...{ id, status, subtasks, checkedSubtasks }} />
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
