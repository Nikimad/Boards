import { useSelector } from "react-redux";
import {
  tasksSelector,
  activeTaskSelector,
} from "../../models/tasks/tasksSelectors";
import { activeBoardIdSelector } from "../../models/boards/boardsSelectors";
import Panel from "./Panel";
import { useState } from "react";

const PanelContainer = () => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => setQuery(e.target.value);

  const activeBoardId = useSelector(activeBoardIdSelector);
  const activeTask = useSelector(activeTaskSelector);
  const { tasks, length, genLength } = useSelector(tasksSelector(query));

  return (
    <Panel
      task={activeTask}
      tasks={tasks}
      length={length}
      genLength={genLength}
      onChange={handleChange}
      query={query}
      isBoardChosen={Boolean(activeBoardId)}
      isTaskChosen={Boolean(activeTask)}
    />
  );
};

export default PanelContainer;
