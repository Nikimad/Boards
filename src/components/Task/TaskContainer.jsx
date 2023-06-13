import { Navigate, useNavigate, useParams } from "react-router-dom";
import Task from "./Task";
import { useSelector } from "react-redux";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";

const TaskContainer = () => {
  const { boardId, taskId } = useParams();
  const task = useSelector(taskByIdSelector(taskId));

  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return Boolean(task) ? (
    <Task task={task} onBack={onBack} />
  ) : (
    <Navigate to={`/board/${boardId}`} />
  );
};

export default TaskContainer;
