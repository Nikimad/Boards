import useAction from "../../../hooks/useAction";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  tasksSelectors,
  patchTask as patchTaskAction,
  deleteTask as deleteTaskAction,
} from "../../../redux/slices/tasks/tasksSlice";
import TaskForm from "../../../components/TaskForm";

const EditTaskPage = () => {
  const { taskId } = useParams();
  
  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  const deleteTask = useAction(deleteTaskAction);
  const patchTask = useAction(patchTaskAction);

  return <TaskForm onSubmit={patchTask} onDelete={deleteTask} task={task} />;
};

export default EditTaskPage;
