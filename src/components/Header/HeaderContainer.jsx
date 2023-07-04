import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

import { boardsSelectors } from "../../models/boards/boardsSelectors";
import { tasksSelectors } from "../../models/tasks/tasksSelectors";

const HeaderContainer = () => {
  const navigate = useNavigate();
  const handleTogglerClick = () => navigate("/");
  const location = useLocation();
  const { boardId, taskId } = useParams();

  const currentBoard = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );
  
  const currentTask = useSelector((state) =>
    tasksSelectors.selectById(state, taskId)
  );

  return Boolean(currentBoard) ? (
    <Header
      onTogglerClick={handleTogglerClick}
      currentBoard={currentBoard}
      currentTask={currentTask}
      previousLocation={{ previousLocation: location }}
    />
  ) : null;
};

export default HeaderContainer;
