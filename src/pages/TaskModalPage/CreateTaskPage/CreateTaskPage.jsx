import useAction from "../../../hooks/useAction";
import { postTask as postTaskAction } from "../../../redux/slices/tasks/tasksSlice";
import TaskForm from "../../../components/TaskForm";

const CreateTaskPage = () => {
  const postTask = useAction(postTaskAction);

  return <TaskForm onSubmit={postTask} />;
};

export default CreateTaskPage;
