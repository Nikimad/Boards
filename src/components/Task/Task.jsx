import "./Task.scss";
import TaskInteractionForm from "../TaskInteractionForm";

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

export default Task;
