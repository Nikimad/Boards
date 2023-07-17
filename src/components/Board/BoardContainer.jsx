import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchTasks } from "../../models/tasksDomain/tasksDomainThunks";
import { tasksDomainSelectors } from "../../models/tasksDomain/tasksDomainSelectors";
import { tasksUISelectors } from "../../models/tasksUI/tasksUISelectors";
import Board from "./Board";
import { useEffect } from "react";
import useAction from "../../hooks/useAction";
import useDebouncedCallback from "../../hooks/useDebounceCallback";

const BoardContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("task");

  const tasksIds = useSelector(tasksUISelectors.selectAll);
  const tasks = useSelector(tasksDomainSelectors.selectByIds(tasksIds));

  const dispatchFetchTasks = useAction(fetchTasks);
  const debouncedDispatchFetchTasks = useDebouncedCallback(dispatchFetchTasks, 250);

  useEffect(() => {
    debouncedDispatchFetchTasks({ boardId, query });
    return () => {
      debouncedDispatchFetchTasks.cancel();
    }
  }, [debouncedDispatchFetchTasks, query, boardId]);

  return Boolean(boardId) ? (
    <Board
      tasks={tasks}
      query={query}
    />
  ) : (
    <Navigate to="/" />
  );
};

export default BoardContainer;
