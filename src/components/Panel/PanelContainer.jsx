import { selectTasksArr, selectActiveTask } from "../../models/tasks/tasksSelectors";
import { selectActiveBoardId } from "../../models/boards/boardsSelectors";
import { useSelector } from "react-redux";
import Panel from "./Panel";

const PanelContainer = () => {
  const items = useSelector(selectTasksArr);
  const activeTask = useSelector(selectActiveTask);
  const activeBoardId = useSelector(selectActiveBoardId);

  return <Panel items={items} activeTask={activeTask} activeBoardId={activeBoardId} />;
};

export default PanelContainer;
