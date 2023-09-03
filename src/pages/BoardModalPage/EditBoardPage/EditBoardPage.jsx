import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../../hooks/useAction";
import {
  boardsSelectors,
  patchBoard as patchBoardAction,
  deleteBoard as deleteBoardAction,
} from "../../../redux/slices/boards/boardsSlice";
import BoardForm from "../../../components/BoardForm";

export const EditBoardPage = () => {
  const { boardId } = useParams();
  
  const board = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const deleteBoard = useAction(deleteBoardAction);
  const patchBoard = useAction(patchBoardAction);

  return (
    <BoardForm onSubmit={patchBoard} onDelete={deleteBoard} board={board} />
  );
};

export default EditBoardPage;
