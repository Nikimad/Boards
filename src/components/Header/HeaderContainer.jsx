import { useNavigate, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";

const HeaderContainer = ({ board, task }) => {
  const { boardId, taskId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const handleTogglerClick = () => navigate("/");

  const { title } = task || board;
  
  return <Header
    boardId={boardId}
    taskId={taskId}
    title={title}
    onTogglerClick={handleTogglerClick}
    previousLocation={{ previousLocation: location }}
  />;
};

HeaderContainer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default HeaderContainer;
