import { usePostBoardMutation } from "../../../redux/services/boardsApi";
import BoardForm from "../../../components/BoardForm";

const CreateBoardPage = () => {
  const [postBoard] = usePostBoardMutation();
  return <BoardForm onSubmit={postBoard} />;
};

export default CreateBoardPage;
