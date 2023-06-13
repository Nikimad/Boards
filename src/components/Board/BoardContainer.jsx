import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { tasksSelector } from "../../models/tasks/tasksSelectors";
import Board from "./Board";

const BoardContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const { isBoardExist, tasks, filtredLength, length } = useSelector(
    tasksSelector(boardId, searchParams.get("search") ?? "")
  );

  return isBoardExist ? (
    <Board
      tasks={tasks}
      query={searchParams.get("search")}
      filtredLength={filtredLength}
      length={length}
    />
  ) : (
    <Navigate to="/" />
  );
};

export default BoardContainer;
