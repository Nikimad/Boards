import { Routes, Route } from "react-router";
import BoardModalPage from "../pages/BoardModalPage";
import TaskModalPage from "../pages/TaskModalPage";

const ModalRoutes = () => (
  <Routes>
  <Route path=":action">
    <Route path="board/:boardId?">
      <Route index element={<BoardModalPage />} />
      <Route path="task/:taskId?" element={<TaskModalPage />} />
    </Route>
  </Route>
</Routes>
);

export default ModalRoutes;
