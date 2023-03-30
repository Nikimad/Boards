import "./TasksColumn.scss";
import Task from "../Task";

const TasksColumn = ({ items, status }) => (
  <>
    {items.length > 0 ? (
      <div className="tasks__panel__column">
        <div
          className={`tasks__panel__column-indicator tasks__panel__column-indicator_${status}`}
        ></div>
        <h2 className="tasks__panel__column-title">{status}</h2>
        <ul className="tasks__panel__column-list">
          {items.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>
    ) : null}
  </>
);
export default TasksColumn;
