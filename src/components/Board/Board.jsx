import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import Modal from "../Modal";
import BoardForm from "../BoardForm";

const Board = ({
  boardValues,
  isCurrent,
  onClick,
  showModal,
  modalProps,
  onSubmit,
  onRemove,
}) => (
  <a
    className="board"
    href={`/${boardValues.title}`}
    onClick={onClick}
    data-current={isCurrent}
  >
    <Icon />
    <span className="board__title">{boardValues.title}</span>
    <Edit onClick={showModal} />

    <Modal {...modalProps}>
      <BoardForm
        formTitle="Edit Board"
        initialValues={boardValues}
        onSubmit={onSubmit}
        onRemove={onRemove}
      />
    </Modal>
  </a>
);

export default Board;
