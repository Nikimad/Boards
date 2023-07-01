import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../../models/tasks/tasksSlice";
import Task from "./Task";

const TaskContainer = () => {
  const { boardId, taskId } = useParams();
  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  return Boolean(task) ? (
    <Task task={task} onBack={onBack} />
  ) : (
    <Navigate to={`/board/${boardId}`} />
  );
};

export default TaskContainer;
