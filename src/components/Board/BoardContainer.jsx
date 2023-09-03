import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../../redux/slices/tasks/tasksSlice";
import Board from "./Board";

const BoardContainer = () => {
  const [searchParams] = useSearchParams();
  const { entities: tasks, isLoading } = useSelector(tasksSelectors.selectData);

  return (
    <Board
      tasks={tasks}
      searchParams={searchParams.get("task")}
      isLoading={isLoading}
    />
  );
};

export default BoardContainer;
