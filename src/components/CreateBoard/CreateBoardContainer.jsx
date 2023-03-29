import useModal from "../../hooks/useModal";
import useStateDepAction from "../../hooks/useStateDepAction";
import { addBoard } from "../../models/boards/boardsSlice";
import getId from "../../helpers/getId";
import CreateBoard from "./CreateBoard";

const CreateBoardContainer = () => {
  const { showModal, ...modalProps } = useModal();
  const dispatchStateDepAddBoard = useStateDepAction(addBoard);

  const handleAddBoard = (values) => {
    dispatchStateDepAddBoard({ id: getId(), ...values});
    modalProps.resetModal();
  };

  return <CreateBoard { ...{ showModal, modalProps}} onSubmit={handleAddBoard} />
};

export default CreateBoardContainer;
