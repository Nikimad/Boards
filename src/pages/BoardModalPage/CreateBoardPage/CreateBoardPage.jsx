import BoardForm from "../../../components/BoardForm";
import { usePostBoardMutation } from "../../../redux/services/boardsApi";

const CreateBoardPage = () => {
  const [postBoard] = usePostBoardMutation();
  return <BoardForm onSubmit={postBoard} />;
};

export default CreateBoardPage;
