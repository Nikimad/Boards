import { useSelector } from "react-redux";
import { selectCurrentBoardId, selectCurrentTasksIds } from "../../models/observer/observerSelectors";
import TasksPanel from "./TasksPanel";

const TasksPanelContainer = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);
  const tasksIds = useSelector(selectCurrentTasksIds);

  return <TasksPanel tasksIds={tasksIds} isBoardChoosen={Boolean(currentBoardId)} />;
};

export default TasksPanelContainer;
