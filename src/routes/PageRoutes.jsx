import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import TaskPage from "../pages/TaskPage";
import ErrorPage from "../pages/ErrorPage";
import LayoutPage from "../pages/LayoutPage";

const PageRoutes = ({ location }) => (
  <Routes location={location}>
    <Route path="/" element={<LayoutPage />}>
      <Route index element={<HomePage />} />
      <Route path="board/:boardId" >
        <Route index element={<BoardPage />} />
        <Route path="task/:taskId">
          <Route index element={<TaskPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default PageRoutes;
