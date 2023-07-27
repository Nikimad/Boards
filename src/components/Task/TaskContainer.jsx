import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Task from "./Task";

const TaskContainer = ({ task, children }) => {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return <Task task={task} onBack={onBack} children={children} />;
};

TaskContainer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  children: PropTypes.element,
};

export default TaskContainer;
