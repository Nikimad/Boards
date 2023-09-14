import useAction from "../../../hooks/useAction";
import { tasksActions } from "../../../models/tasks";
import TaskForm from "../../../components/TaskForm";

const CreateTaskPage = () => {
  const createTask = useAction(tasksActions.createTask);

  return <TaskForm onSubmit={createTask} />;
};

export default CreateTaskPage;
