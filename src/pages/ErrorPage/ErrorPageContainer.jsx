import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { resetIsError as resetIsErrorBoardsAction, boardsSelectors } from "../../redux/slices/boards/boardsSlice";
import { resetIsError as resetIsErrorTasksAction, tasksSelectors } from "../../redux/slices/tasks/tasksSlice";
import ErrorPage from "./ErrorPage";

const ErrorPageContainer = () => {
  const navigate = useNavigate();

  const resetBoardsError = useAction(resetIsErrorBoardsAction);
  const resetTasksError = useAction(resetIsErrorTasksAction);
  
  const boardsError = useSelector(boardsSelectors.selectError);
  const tasksError = useSelector(tasksSelectors.selectError);

  useEffect(() => {
    const timerId = setTimeout(() => navigate("/"), 2000);
    if (boardsError === "404") resetBoardsError();
    if (tasksError === "404") resetTasksError();
    return () => {
      clearTimeout(timerId);
    };
  }, [boardsError, tasksError, resetBoardsError, resetTasksError, navigate]);

  return <ErrorPage />;
};

export default ErrorPageContainer;
