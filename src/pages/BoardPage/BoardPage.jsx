import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { useGetBoardQuery } from "../../redux/services/boardsApi";
import { useGetTasksQuery } from "../../redux/services/tasksApi";
import Header from "../../components/Header";
import Board from "../../components/Board";
import Plug from "../../components/Plug/Plug";

const BoardPageContainer = () => {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const taskSearchParams = searchParams.get("task");

  const { 
    data: board, 
    isLoading: isLoadingBoard, 
    isError: isErrorBoard 
  } = useGetBoardQuery(boardId);

  const { 
    data: tasks = [],
    isLoading: isLoadingTasks,
    isError: isErrorTasks,
  } = useGetTasksQuery({ boardId, searchParams: taskSearchParams });

  return (
    isErrorBoard || isErrorTasks ? (<Navigate to="/error" />) :
    isLoadingBoard || isLoadingTasks ? <Plug isLoading={true} message={`Fetch ${isLoadingBoard ? "board" : "tasks"}`} /> : 
      <>
        <Header board={board} />
        <Board tasks={tasks} searchParams={taskSearchParams} />
      </>
  );
};

export default BoardPageContainer;
