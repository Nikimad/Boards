import { useLocation } from "react-router-dom";
import HiddableContentContextProvider from "./components/HiddableContentContextProvider";
import PageRoutes from "./routes/PageRoutes";
import ModalRoutes from "./routes/ModalRoutes";

const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  return (
    <HiddableContentContextProvider>
      <PageRoutes location={previousLocation || location} />
      {previousLocation && <ModalRoutes />}
    </HiddableContentContextProvider>
  );
};

export default App;