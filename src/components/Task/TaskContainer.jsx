import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { tasksSelectors } from "../../redux/slices/tasks/tasksSlice";
import Task from "./Task";

const TaskContainer = ({ children }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const onBack = () => navigate(-1);

  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  return <Task task={task} onBack={onBack} children={children} />;
};

TaskContainer.propTypes = {
  children: PropTypes.element,
};

export default TaskContainer;
