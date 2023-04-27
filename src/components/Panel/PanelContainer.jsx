import Panel from "./Panel";
import { selectTasksArr, selectActiveTask } from "../../models/tasks/tasksSelectors";
import { selectActiveBoardId } from "../../models/boards/boardsSelectors";
import { useSelector } from "react-redux";

const PanelContainer = () => {
  const items = useSelector(selectTasksArr);
  const activeTask = useSelector(selectActiveTask);
  const activeBoardId = useSelector(selectActiveBoardId);

  return <Panel { ...{items, activeTask, activeBoardId}} />;
};

export default PanelContainer;
