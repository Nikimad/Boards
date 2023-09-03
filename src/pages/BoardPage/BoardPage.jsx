import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import {
  boardsSelectors,
  fetchBoard,
} from "../../redux/slices/boards/boardsSlice";
import {
  fetchTasks,
  tasksSelectors,
} from "../../redux/slices/tasks/tasksSlice";
import Board from "../../components/Board";

const BoardPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const taskSearchParams = searchParams.get("task");

  const getBoard = useAction(fetchBoard);
  const getTasks = useAction(fetchTasks);

  const board = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const isBoardsError = useSelector(boardsSelectors.selectIsError);
  const isTasksError = useSelector(tasksSelectors.selectIsError);

  useEffect(() => {
    if (!Boolean(board)) getBoard(boardId);
  }, [board, getBoard, boardId]);

  useEffect(() => {
    getTasks({ boardId, searchParams: taskSearchParams });
  }, [boardId, getTasks, taskSearchParams]);

  useEffect(() => {
    if (isBoardsError || isTasksError) navigate("/error");
  }, [isBoardsError, isTasksError, navigate]);

  return <Board />;
};

export default BoardPage;
