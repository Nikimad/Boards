import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import { tasksSelectors } from "../../models/tasks/tasksSelectors";
import Header from "./Header";

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

  return (
    currentBoard && (
      <Header
        onTogglerClick={handleTogglerClick}
        currentBoard={currentBoard}
        currentTask={currentTask}
        previousLocation={{ previousLocation: location }}
      />
    )
  );
};

export default HeaderContainer;
