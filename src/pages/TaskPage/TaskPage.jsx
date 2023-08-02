import { Navigate, useParams } from "react-router-dom";
import { useGetTasksQuery } from "../../redux/services/tasksApi";
import Task from "../../components/Task";
import EditTaskPage from "../TaskModalPage/EditTaskPage";
import Header from "../../components/Header";

const TaskPage = () => {
  const { boardId, taskId } = useParams();
  const { task } = useGetTasksQuery(
    { boardId },
    {
      selectFromResult: ({ data }) => ({
        task: data.find(({ id }) => id === Number(taskId)),
      }),
    }
  );

  return Boolean(taskId) ? (
    <>
      <Header task={task} />
      <Task task={task}>
        <EditTaskPage />
      </Task>
    </>
  ) : (
    <Navigate to="/error" />
  );
};

export default TaskPage;
