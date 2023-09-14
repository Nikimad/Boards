import { useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/selectors";
import { tasksSelectors } from "../../models/tasks/selectors";
import Header from "./Header";

const HeaderContainer = () => {
  const { boardId, taskId } = useParams();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTogglerClick = () => navigate("/");

  const board = useSelector((state) => boardsSelectors.selectById(state, boardId));
  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  const title = task?.title || board?.title;
  
  return board || task  ? <Header
    boardId={boardId}
    taskId={taskId}
    title={title}
    onTogglerClick={handleTogglerClick}
    searchParams={searchParams.get("task")}
    previousLocation={location}
  /> : null ;
};

export default HeaderContainer;
