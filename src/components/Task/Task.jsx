import "./Task.scss";
import TaskInteractionForm from "../TaskInteractionForm";
import PropTypes from "prop-types";

const Task = ({ task, onBack }) => (
  <div className="task">
    {task.description.length > 0 ? (
      <p className="task__description">{task.description}</p>
    ) : null}
    <TaskInteractionForm {...task} />
    <div className="task__controls">
      <button className="task__button" onClick={onBack}>
        Back
      </button>
    </div>
  </div>
);

Task.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    boardId: PropTypes.number,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }),
  onBack: PropTypes.func,
};

export default Task;
