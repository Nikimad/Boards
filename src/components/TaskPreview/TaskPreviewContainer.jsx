import PropTypes from "prop-types";
import TaskPreview from "./TaskPreview";
import { useLocation } from "react-router-dom";

const TaskPreviewContainer = ({ task }) => {
  const location = useLocation();

  return (
    <TaskPreview
      task={task}
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
