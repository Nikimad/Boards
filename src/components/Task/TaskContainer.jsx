import { useNavigate, useParams } from "react-router-dom";
import Task from "./Task";
import { useSelector } from "react-redux";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";

const TaskContainer = () => {
  const { taskId } = useParams();
  const task = useSelector(taskByIdSelector(taskId));
  
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return <Task task={task} onBack={onBack} />;
};

export default TaskContainer;
