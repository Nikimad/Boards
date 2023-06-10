import { Routes, Route } from "react-router-dom";
import BoardForm from "../components/BoardForm";
import TaskForm from "../components/TaskForm";
import TaskAutoSaveForm from "../components/TaskAutoSaveForm";

const ModalRoutes = () => (
  <Routes>
      <Route path="board/:boardId" >
        <Route path=":action" element={<BoardForm />} />
        <Route path="task/:taskId">
          <Route path="review" element={<TaskAutoSaveForm />} />
          <Route path=":action" element={<TaskForm />} />
        </Route>
      </Route>
  </Routes>
);

export default ModalRoutes;
