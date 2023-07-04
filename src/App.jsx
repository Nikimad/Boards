import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBoards } from "./models/boards/boardsSlice";
import HiddableContentContextProvider from "./components/HiddableContentContextProvider";
import PageRoutes from "./routes/PageRoutes";
import ModalRoutes from "./routes/ModalRoutes";

const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch, fetchBoards]);

  return (
    <HiddableContentContextProvider>
      <PageRoutes location={previousLocation || location} />
      {previousLocation && <ModalRoutes />}
    </HiddableContentContextProvider>
  );
};

export default App;
