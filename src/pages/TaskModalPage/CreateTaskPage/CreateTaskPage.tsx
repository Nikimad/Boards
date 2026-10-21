import { usePostTaskMutation } from "../../../redux/services/tasksApi";
import TaskForm from "../../../components/TaskForm";

const CreateTaskPage = () => {
  const [postTask] = usePostTaskMutation();
  return <TaskForm onSubmit={postTask} />;
};

export default CreateTaskPage;
