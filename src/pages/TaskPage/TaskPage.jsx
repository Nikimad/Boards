import { Navigate, useParams } from "react-router-dom";
import { useGetTaskQuery } from "../../redux/services/tasksApi";
import Task from "../../components/Task";
import EditTaskPage from "../TaskModalPage/EditTaskPage";
import Header from "../../components/Header";
import Plug from "../../components/Plug/Plug";

const TaskPage = () => {
  const { taskId } = useParams();

  const { data, isLoading, isError } = useGetTaskQuery(taskId);

  return isError ? (
    <Navigate to="/error" />
  ) : isLoading ? (
    <Plug isLoading={true} message="Fetch task" />
  ) : (
    <>
      <Header task={data} />
      <Task task={data}>
        <EditTaskPage />
      </Task>
    </>
  );
};

export default TaskPage;
