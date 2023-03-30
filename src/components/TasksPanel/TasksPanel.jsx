import "./TasksPanel.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import TasksColumn from "../TasksColumn";

const TasksPanel = ({ tasksIds, isBoardChoosen }) => (
  <ul className="tasks__panel">
    {tasksIds.length > 0 ? (
      <>
        <TasksColumn status="todo" />
        <TasksColumn status="doing" />
        <TasksColumn status="done" />
      </>
    ) : (
      <div className="tasks__panel__plug">
        <Icon width="3em" />
        <p>{isBoardChoosen ? "No tasks on this board yet" : "Choose board"}</p>
      </div>
    )}
  </ul>
);

export default TasksPanel;
