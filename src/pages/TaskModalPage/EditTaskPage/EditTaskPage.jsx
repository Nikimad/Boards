import useAction from "../../../hooks/useAction";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  tasksActions,
  tasksSelectors,
} from "../../../redux/slices/tasks/tasksSlice";
import TaskForm from "../../../components/TaskForm";

const EditTaskPage = () => {
  const { taskId } = useParams();
  
  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  const deleteTask = useAction(tasksActions.deleteTask);
  const editTask = useAction(tasksActions.editTask);

  return <TaskForm onSubmit={editTask} onDelete={deleteTask} task={task} />;
};

export default EditTaskPage;
