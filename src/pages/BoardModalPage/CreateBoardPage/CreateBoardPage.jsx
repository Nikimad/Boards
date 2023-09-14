import useAction from "../../../hooks/useAction";
import { boardsActions } from "../../../models/boards";
import BoardForm from "../../../components/BoardForm";

const CreateBoardPage = () => {
  const createBoard = useAction(boardsActions.createBoard);

  return <BoardForm onSubmit={createBoard} />;
};

export default CreateBoardPage;
