import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../../hooks/useAction";
import {
  boardsSelectors,
  boardsActions,
} from "../../../redux/slices/boards/boardsSlice";
import BoardForm from "../../../components/BoardForm";

export const EditBoardPage = () => {
  const { boardId } = useParams();

  const board = useSelector((state) =>
    boardsSelectors.selectById(state, boardId)
  );

  const deleteBoard = useAction(boardsActions.deleteBoard);
  const editBoard = useAction(boardsActions.editBoard);

  return (
    <BoardForm onSubmit={editBoard} onDelete={deleteBoard} board={board} />
  );
};

export default EditBoardPage;
