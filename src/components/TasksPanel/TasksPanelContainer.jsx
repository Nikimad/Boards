import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../models/observer/observerSelectors";
import TasksPanel from "./TasksPanel";
import { selectCurrentTasks } from "../../models/tasks/tasksSelectors";

const TasksPanelContainer = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const tasks = useSelector(selectCurrentTasks);

  return <TasksPanel tasks={tasks} isBoardChoosen={Boolean(currentBoardId)} />;
};

export default TasksPanelContainer;
