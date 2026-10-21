import { useParams } from "react-router";
import CreateBoardPage from "./CreateBoardPage";
import EditBoardPage from "./EditBoardPage";

const BoardModalPage = () => {
  const { action } = useParams();
  return action === "create" ? <CreateBoardPage /> : <EditBoardPage />;
}

export default BoardModalPage;
