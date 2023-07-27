import { useParams } from "react-router-dom";
import { useDeleteTaskMutation, useGetTaskQuery, usePatchTaskMutation } from "../../../redux/services/tasksApi";
import TaskForm from "../../../components/TaskForm";
import Plug from "../../../components/Plug/Plug";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const { data, isLoading, isError } = useGetTaskQuery(taskId);
  const [deleteTask] = useDeleteTaskMutation();
  const [patchTask] = usePatchTaskMutation();

  return isError ? <Navigate to="/error" /> :
    isLoading ? <Plug isLoading={true} /> :
    <TaskForm onSubmit={patchTask} onDelete={deleteTask} task={data} />
};

export default EditTaskPage;
