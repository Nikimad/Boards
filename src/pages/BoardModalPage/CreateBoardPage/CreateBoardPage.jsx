import useAction from "../../../hooks/useAction";
import { postBoard as postBoardAction } from "../../../redux/slices/boards/boardsSlice";
import BoardForm from "../../../components/BoardForm";

const CreateBoardPage = () => {
  const postBoard = useAction(postBoardAction);

  return <BoardForm onSubmit={postBoard} />;
};

export default CreateBoardPage;
