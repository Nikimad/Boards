import { Routes, Route } from "react-router-dom";
import BoardForm from "../components/BoardForm";
import TaskForm from "../components/TaskForm";

const ModalRoutes = () => (
  <Routes>
    <Route path=":action">
      <Route path="board/:boardId?">
        <Route index element={<BoardForm />} />
        <Route path="task/:taskId?" element={<TaskForm />} />
      </Route>
    </Route>
  </Routes>
);

export default ModalRoutes;
