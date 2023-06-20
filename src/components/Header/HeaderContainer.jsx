import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardByIdSelector } from "../../models/boards/boardsSelectors";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";
import getId from "../../helpers/getId";
import Header from "./Header";

const HeaderContainer = () => {
  const navigate = useNavigate();
  const handleTogglerClick = () => navigate('/');
  const location = useLocation();
  const { boardId, taskId } = useParams();

  const currentBoard = useSelector(boardByIdSelector(boardId));
  const currentTask = useSelector(taskByIdSelector(taskId));

  return (
    <Header
      onTogglerClick={handleTogglerClick}
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
