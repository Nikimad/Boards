import { Routes, Route } from "react-router-dom";
import BoardForm from "../components/BoardForm";
import TaskForm from "../components/TaskForm";

const ModalRoutes = () => (
  <Routes>
    <Route path="board/:boardId">
      <Route path=":action" element={<BoardForm />} />
      <Route path="task/:taskId:action" element={<TaskForm />} />
    </Route>
  </Routes>
);

export default ModalRoutes;
