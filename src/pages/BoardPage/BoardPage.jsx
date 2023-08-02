import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { useGetTasksQuery } from "../../redux/services/tasksApi";
import { useGetBoardsQuery } from "../../redux/services/boardsApi";
import Board from "../../components/Board";
import Plug from "../../components/Plug/Plug";
import Header from "../../components/Header";

const BoardPageContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const taskSearchParams = searchParams.get("task");
  const {
    data = [],
    isLoading,
    isError,
  } = useGetTasksQuery({ boardId, searchParams: taskSearchParams });

  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      board: data?.find(({ id }) => id === Number(boardId)),
    }),
  });

  return isError ? (
    <Navigate to="/error" />
  ) : isLoading ? (
    <Plug isLoading={true} message="Fetch tasks" />
  ) : Boolean(board) ? (
    <>
      <Header board={board} />
      <Board tasks={data} searchParams={taskSearchParams} />
    </>
  ) : (
    <Navigate to="/error" />
  );
};

export default BoardPageContainer;
