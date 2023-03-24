import { useSelector } from "react-redux";
import {
  selectCurrentBoardId,
  selectCurrentTasks,
} from "../../models/observer/observerSelectors";
import TasksPanel from "./TasksPanel";

const TasksPanelContainer = () => {
  const tasksIds = useSelector(selectCurrentTasks);
  const currentBoardId = useSelector(selectCurrentBoardId);

  return (
    <TasksPanel tasksIds={tasksIds} isBoardChoosen={Boolean(currentBoardId)} />
  );
};

export default TasksPanelContainer;
