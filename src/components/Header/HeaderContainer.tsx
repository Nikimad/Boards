import { useNavigate, useLocation, useParams } from "react-router";
import type { Board, Task } from "../../types";
import Header from "./Header";

interface HeaderContainerProps {
  board?: Board;
  task?: Task;
}

const HeaderContainer = ({ board, task }: HeaderContainerProps) => {
  const { boardId, taskId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const handleTogglerClick = () => navigate("/");

  const title = task?.title || board?.title;
  
  return <Header
    boardId={boardId}
    taskId={taskId}
    title={title}
    onTogglerClick={handleTogglerClick}
    previousLocation={{ previousLocation: location }}
  />;
};

export default HeaderContainer;
