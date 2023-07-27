import { useParams } from "react-router-dom";
import { useGetBoardQuery, useDeleteBoardMutation, usePatchBoardMutation } from "../../../redux/services/boardsApi";
import BoardForm from "../../../components/BoardForm";
import Plug from "../../../components/Plug";

export const EditBoardPage = () => {
  const { boardId } = useParams();
  const { data, isLoading, isError } = useGetBoardQuery(boardId);
  const [deleteBoard] = useDeleteBoardMutation();
  const [patchBoard] = usePatchBoardMutation();

  return isError ? <Navigate to="/error" /> :
    isLoading ? <Plug isLoading={true} /> :
    <BoardForm onSubmit={patchBoard} onDelete={deleteBoard} board={data} />
};

export default EditBoardPage;
