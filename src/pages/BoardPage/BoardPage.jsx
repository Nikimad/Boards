import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { useGetTasksQuery } from "../../redux/services/tasksApi";
import { useGetBoardQuery } from "../../redux/services/boardsApi";
import Board from "../../components/Board";
import Plug from "../../components/Plug/Plug";
import Header from "../../components/Header";

const BoardPageContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const taskSearchParams = searchParams.get("task");

  const {
    data = [],
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useGetTasksQuery({ boardId, searchParams: taskSearchParams });

  const {
    data: board,
    isLoading: isBoardLoading,
    isError: isBoardError,
  } = useGetBoardQuery(boardId);

  return isTasksError || isBoardError ? (
    <Navigate to="/error" />
  ) : isTasksLoading || isBoardLoading ? (
    <Plug
      isLoading={true}
      message={`Fetch ${Boolean(isTasksLoading) ? "tasks" : "board"}`}
    />
  ) : (
    <>
      <Header board={board} />
      <Board tasks={data} searchParams={taskSearchParams} />
    </>
  );
};

export default BoardPageContainer;
