import "./TasksPanel.scss";
import Task from "../Task";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";

const TasksPanel = ({ tasks, isBoardChoosen }) => (
  <ul className="tasks__panel">
    {tasks.length > 0 ? (
      tasks.map((task) => <Task key={task.id} task={task} />)
    ) : (
      <div className="tasks__panel__plug">
        <Icon width="3em" />
        <p>{isBoardChoosen ? "No tasks on this board yet" : "Choose board"}</p>
      </div>
    )}
  </ul>
);

export default TasksPanel;
