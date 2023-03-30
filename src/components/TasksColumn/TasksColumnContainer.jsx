import TasksColumn from "./TasksColumn";
import { selectStatusDepCurrentTasks } from "../../models/tasks/tasksSelectors";
import { useSelector } from "react-redux";

const TasksColumnContainer = ({status}) => {
  const items = useSelector(selectStatusDepCurrentTasks(status));

  return <TasksColumn { ...{items, status}} />;
};

export default TasksColumnContainer;
