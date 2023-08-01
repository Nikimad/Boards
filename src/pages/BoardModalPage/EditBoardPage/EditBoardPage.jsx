import { useParams } from "react-router-dom";
import { useGetBoardsQuery, useDeleteBoardMutation, usePatchBoardMutation } from "../../../redux/services/boardsApi";
import BoardForm from "../../../components/BoardForm";

export const EditBoardPage = () => {
  const { boardId } = useParams();
  const { board } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data }) => ({ board: data?.find(({ id }) => id === Number(boardId)) })
  });
  
  const [deleteBoard] = useDeleteBoardMutation();
  const [patchBoard] = usePatchBoardMutation();

  return <BoardForm onSubmit={patchBoard} onDelete={deleteBoard} board={board} />
};

export default EditBoardPage;
