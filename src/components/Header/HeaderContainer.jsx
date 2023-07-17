import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

import { boardsDomainSelectors } from "../../models/boardsDomain/boardsDomainSelectors";
import { tasksDomainSelectors } from "../../models/tasksDomain/tasksDomainSelectors";

const HeaderContainer = () => {
  const navigate = useNavigate();
  const handleTogglerClick = () => navigate("/");
  const location = useLocation();
  const { boardId, taskId } = useParams();

  const currentBoard = useSelector((state) =>
    boardsDomainSelectors.selectById(state, boardId)
  );

  const currentTask = useSelector((state) =>
    tasksDomainSelectors.selectById(state, taskId)
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
