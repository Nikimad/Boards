import { useParams, Navigate } from "react-router-dom";
import { useGetTaskQuery } from "../../redux/services/tasksApi";
import Header from "../../components/Header";
import Task from "../../components/Task";
import Plug from "../../components/Plug";
import EditTaskPage from "../TaskModalPage/EditTaskPage";

const TaskPage = () => {
  const { taskId } = useParams();
  const { data, isLoading, isError } = useGetTaskQuery(taskId);

  return (
    isError ? <Navigate to="/error" /> :
    isLoading ? <Plug isLoading={true} message="Fetch task" /> :
    <>
      <Header task={data} />
      <Task task={data}>
        <EditTaskPage />
      </Task>
    </>
  );
};

export default TaskPage;