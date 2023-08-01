import { useParams } from "react-router-dom";
import { useDeleteTaskMutation, useGetTasksQuery, usePatchTaskMutation } from "../../../redux/services/tasksApi";
import TaskForm from "../../../components/TaskForm";

const EditTaskPage = () => {
  const { boardId, taskId } = useParams();
  const { task } = useGetTasksQuery({ boardId }, {
    selectFromResult: ({ data }) => ({ task: data?.find(({ id }) => id === Number(taskId)) }),
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [patchTask] = usePatchTaskMutation();

  return <TaskForm onSubmit={patchTask} onDelete={deleteTask} task={task} />
};

export default EditTaskPage;
