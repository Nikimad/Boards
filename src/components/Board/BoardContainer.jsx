import { useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import useDebouncedCallback from "../../hooks/useDebounceCallback";
import { tasksSelectors } from "../../models/tasks/tasksSelectors";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import { getTasks } from "../../models/tasks/tasksThunks";
import Board from "./Board";

const BoardContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();

  const currentBoard = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const taskSearchParams = searchParams.get("task");

  const visibleTasksIds = useSelector(tasksSelectors.selectVisibleIds);
  const tasks = useSelector(tasksSelectors.selectByIds(visibleTasksIds));
  const tasksLoadingStatus = useSelector(tasksSelectors.selectLoadingStatus);
  const tasksError = useSelector(tasksSelectors.selectError);

  const dispatchGetTasks = useAction(getTasks);
  const debouncedDispatchGetTasks = useDebouncedCallback(dispatchGetTasks, 150);

  useEffect(() => {
    debouncedDispatchGetTasks({ boardId, searchParams: taskSearchParams });
    return () => {
      debouncedDispatchGetTasks.cancel();
    };
  }, [debouncedDispatchGetTasks, taskSearchParams, boardId]);

  return Boolean(currentBoard) ? (
    <Board
      tasks={tasks}
      searchParams={taskSearchParams}
      isLoading={tasksLoadingStatus === "loading"}
      isErr={Boolean(tasksError)}
    />
  ) : <Navigate to="/" />;
};

export default BoardContainer;
