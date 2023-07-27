import { useParams } from "react-router-dom";
import CreateTaskPage from "./CreateTaskPage";
import EditTaskPage from "./EditTaskPage";

const TaskModalPage = () => {
  const { action } = useParams();
  return action === "create" ? <CreateTaskPage /> : <EditTaskPage />;
};

export default TaskModalPage;
