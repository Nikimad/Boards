import PropTypes from "prop-types";
import TaskInteractionForm from "../TaskInteractionForm";
import s from "./Task.module.scss";

const Task = ({ task, onBack }) => (
  <div className={s.task}>
    {task.description.length > 0 ? (
      <p className={s.task__description}>{task.description}</p>
    ) : null}
    <TaskInteractionForm {...task} />
    <div className={s.task__controls}>
      <button className={s.task__button} onClick={onBack}>
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
