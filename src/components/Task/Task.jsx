import PropTypes from "prop-types";
import TaskInteractionForm from "../TaskInteractionForm";
import s from "./Task.module.scss";

const Task = ({ task, onBack }) => (
  <div className={s.task}>
    {task.description.length > 0 ? (
      <p className={s.task__description}>{task.description}</p>
    ) : null}
    <TaskInteractionForm task={task} />
    <button className={s.task__button} onClick={onBack}>
      Back
    </button>
  </div>
);

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  onBack: PropTypes.func,
};

export default Task;
