import { Navigate, useParams } from "react-router";
import { useGetBoardsQuery, useDeleteBoardMutation, usePatchBoardMutation } from "../../../redux/services/boardsApi";
import BoardForm from "../../../components/BoardForm";

export const EditBoardPage = () => {
  const { boardId } = useParams();
  const { board, isSettled } = useGetBoardsQuery(undefined, {
    selectFromResult: ({ data, isSuccess, isError }) => ({
      board: data?.find(({ id }) => id === Number(boardId)),
      isSettled: isSuccess || isError,
    })
  });
  
  const [deleteBoard] = useDeleteBoardMutation();
  const [patchBoard] = usePatchBoardMutation();

  // without `board` the form would render as "create" and patch `/undefined`
  if (!board) return isSettled ? <Navigate to="/error" /> : null;

  return <BoardForm onSubmit={patchBoard} onDelete={deleteBoard} board={board} />
};

export default EditBoardPage;
