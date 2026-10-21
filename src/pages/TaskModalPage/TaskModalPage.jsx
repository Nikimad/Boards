import { useParams } from "react-router";
import CreateTaskPage from "./CreateTaskPage";
import EditTaskPage from "./EditTaskPage";

const TaskModalPage = () => {
  const { action } = useParams();
  return action === "create" ? <CreateTaskPage /> : <EditTaskPage />;
};

export default TaskModalPage;
