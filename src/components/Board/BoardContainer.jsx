import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchTasks, tasksSelectors } from "../../models/tasks/tasksSlice";
import Board from "./Board";
import { useEffect } from "react";
import useAction from "../../hooks/useAction";

const BoardContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("tasks");

  const tasks = useSelector(tasksSelectors);

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
