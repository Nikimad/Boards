import { useSelector } from "react-redux";
import {
  tasksSelector,
  activeTaskSelector,
} from "../../models/tasks/tasksSelectors";
import { activeBoardIdSelector, filterSelector } from "../../models/view/viewSelectors";
import Panel from "./Panel";

const PanelContainer = () => {
  const activeBoardId = useSelector(activeBoardIdSelector);
  const activeTask = useSelector(activeTaskSelector);
  const query = useSelector(filterSelector);
  const { tasks, length, genLength } = useSelector(tasksSelector);

  return (
    <Panel
      task={activeTask}
      tasks={tasks}
      query={query}
      length={length}
      genLength={genLength}
      isBoardChosen={Boolean(activeBoardId)}
      isTaskChosen={Boolean(activeTask)}
    />
  );
};

export default PanelContainer;
