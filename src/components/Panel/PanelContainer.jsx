import { useSelector } from "react-redux";
import { tasksSelector, activeTaskSelector } from "../../models/tasks/tasksSelectors";
import { activeBoardIdSelector } from "../../models/boards/boardsSelectors";
import Panel from "./Panel";

const PanelContainer = () => {
  const items = useSelector(tasksSelector);
  const activeTask = useSelector(activeTaskSelector);
  const activeBoardId = useSelector(activeBoardIdSelector);

  return <Panel items={items} activeTask={activeTask} activeBoardId={activeBoardId} />;
};

export default PanelContainer;
