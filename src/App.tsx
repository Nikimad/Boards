import { useLocation } from "react-router";
import HiddableContentContextProvider from "./components/HiddableContentContextProvider";
import PageRoutes from "./routes/PageRoutes";
import ModalRoutes from "./routes/ModalRoutes";
import type { PreviousLocationState } from "./types";

const App = () => {
  const location = useLocation();
  const previousLocation = (location.state as PreviousLocationState | null)?.previousLocation;

  return (
    <HiddableContentContextProvider>
      <PageRoutes location={previousLocation || location} />
      {previousLocation && <ModalRoutes />}
    </HiddableContentContextProvider>
  );
};

export default App;