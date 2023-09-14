import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { boardsActions } from "../../models/boards";
import { boardsSelectors } from "../../models/boards/selectors";
import { tasksActions } from "../../models/tasks";
import { tasksSelectors } from "../../models/tasks/selectors";
import ErrorPage from "./ErrorPage";

const ErrorPageContainer = () => {
  const navigate = useNavigate();

  const resetBoardsError = useAction(boardsActions.resetIsError);
  const resetTasksError = useAction(tasksActions.resetIsError);
  
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
