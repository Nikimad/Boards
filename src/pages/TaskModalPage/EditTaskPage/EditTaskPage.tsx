import { Navigate, useParams } from "react-router";
import { useDeleteTaskMutation, useGetTasksQuery, usePatchTaskMutation } from "../../../redux/services/tasksApi";
import TaskForm from "../../../components/TaskForm";

const EditTaskPage = () => {
  const { boardId, taskId } = useParams();
  const { task, isSettled } = useGetTasksQuery({ boardId }, {
    selectFromResult: ({ data, isSuccess, isError }) => ({
      task: data?.find(({ id }) => id === Number(taskId)),
      isSettled: isSuccess || isError,
    }),
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [patchTask] = usePatchTaskMutation();

  // without `task` the form would render as "create" and patch `/undefined`
  if (!task) return isSettled ? <Navigate to="/error" /> : null;

  return <TaskForm onSubmit={patchTask} onDelete={deleteTask} task={task} />
};

export default EditTaskPage;
