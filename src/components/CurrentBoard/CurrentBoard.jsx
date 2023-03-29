import "./CurrentBoard.scss";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import Modal from "../Modal";
import BoardForm from "../BoardForm";

const CurrentBoard = ({
  showModal,
  modalProps,
  boardsValues,
  onSubmit,
  onRemove,
}) => (
  <div className="current-board">
    <h2 className="current-board__title">{boardsValues.title}</h2>
    <button className="current-board__edit" onClick={showModal}>
      <Edit aria-hidden="true" />
    </button>
    <Modal {...modalProps}>
      <BoardForm
        formTitle="Edit Board"
        initialValues={boardsValues}
        onSubmit={onSubmit}
        onRemove={onRemove}
      />
    </Modal>
  </div>
);

export default CurrentBoard;
