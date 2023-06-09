import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useLocation, useParams}  from "react-router-dom";
import { useSelector } from "react-redux";
import { boardByIdSelector } from "../../models/boards/boardsSelectors";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";
import getId from "../../helpers/getId";
import Header from "./Header";

const HeaderContainer = () => {
  const { toggleIsHidden } = useContext(HiddableContentContext);
  const location = useLocation();
  const { boardId, taskId } = useParams();

  const currentBoard = useSelector(boardByIdSelector(boardId));
  const currentTask = useSelector(taskByIdSelector(taskId));

  return (
    <Header
      toggleNavbar={toggleIsHidden}
      currentBoard={currentBoard}
      isBoardChosen={Boolean(currentBoard)}
      currentTask={currentTask}
      isTaskChosen={Boolean(currentTask)}
      boardPath={`edit board/${boardId}`}
      taskEditPath={`board/${boardId}/edit task/${taskId}`}
      taskCreatePath={`board/${boardId}/create task/${getId()}`}
      state={{ previousLocation: location, boardId, taskId }}
    />
  );
};

export default HeaderContainer;
