import useAction from "../../../hooks/useAction";
import { boardsActions } from "../../../redux/slices/boards/boardsSlice";
import BoardForm from "../../../components/BoardForm";

const CreateBoardPage = () => {
  const createBoard = useAction(boardsActions.createBoard);

  return <BoardForm onSubmit={createBoard} />;
};

export default CreateBoardPage;
