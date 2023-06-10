import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useLocation, useParams } from "react-router-dom";
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
      boardEditPath={`board/${boardId}/edit`}
      taskEditPath={`board/${boardId}/task/${taskId}/edit`}
      taskCreatePath={`board/${boardId}/task/${getId()}/create`}
      previousLocation={{ previousLocation: location}}
    />
  );
};

export default HeaderContainer;
