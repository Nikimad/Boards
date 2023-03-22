import "./TasksPanel.scss";
import Task from "../Task";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";

const TasksPanel = ({ tasksIds, isBoardChoosen }) => (
  <ul className="tasks__panel">
    {tasksIds ? (
      tasksIds.map((id) => <Task key={id} id={id} />)
    ) : (
      <div className="tasks__panel__plug">
        <Icon  width="3em"/>
        <p>{isBoardChoosen ? "No tasks on this board yet" : "Choose board"}</p>
      </div>
    )}
  </ul>
);

export default TasksPanel;
