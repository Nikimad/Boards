import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PanelPage from "../pages/PanelPage";
import ErrPage from "../pages/ErrPage";

const PageRoutes = ({ location }) => (
  <Routes location={location}>
    <Route path="/" element={<MainPage />}>
      <Route index element={<PanelPage name="plug" message="Choose board" />} />
      <Route path="board/:boardId">
        <Route index element={<PanelPage name="board" />} />
        <Route path="task/:taskId">
          <Route index element={<PanelPage name="task" />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<ErrPage />} />
  </Routes>
);

export default PageRoutes;
