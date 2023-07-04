import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTasks } from "../../models/tasks/tasksSlice";
import { tasksSelectors } from "../../models/tasks/tasksSelectors";
import Board from "./Board";
import { useEffect } from "react";
import useAction from "../../hooks/useAction";

const BoardContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("task");

  const tasks = useSelector(tasksSelectors.selectAll);

  const dispatchGetTasks = useAction(getTasks);

  useEffect(() => {
    dispatchGetTasks({ boardId, query });
  }, [dispatchGetTasks, query, boardId]);

  return Boolean(boardId) ? (
    <Board
      tasks={tasks}
      query={query}
      length={tasks.length}
    />
  ) : (
    <Navigate to="/" />
  );
};

export default BoardContainer;
