import PropTypes from "prop-types";
import TaskPreview from "./TaskPreview";
import { useNavigate, useLocation } from "react-router-dom";

const TaskPreviewContainer = ({ task }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => navigate(`task/${task.id}`);

  return (
    <TaskPreview
      task={task}
      onClick={handleClick}
      previousLocation={{ previousLocation: location }}
    />
  );
};

TaskPreviewContainer.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    boardId: PropTypes.number,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }),
};

export default TaskPreviewContainer;
