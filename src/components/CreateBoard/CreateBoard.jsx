import "./CreateBoard.scss";
import Modal from "../Modal";
import BoardForm from "../BoardForm";

const CreateBoard = ({ showModal, modalProps, onSubmit }) => (
  <>
    <button className="create-board" onClick={showModal}>
      + Create New Board
    </button>
    <Modal {...modalProps}>
      <BoardForm formTitle="Create Board" onSubmit={onSubmit} />
    </Modal>
  </>
);

export default CreateBoard;
