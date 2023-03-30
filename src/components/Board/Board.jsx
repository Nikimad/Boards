import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import EditBoard from "../EditBoard";

const Board = ({ board, isCurrent, onClick, showModal, modalProps }) => (
  <a
    className="board"
    href={`/${board.title}`}
    onClick={onClick}
    data-current={isCurrent}
  >
    <Icon />
    <span className="board__title">{board.title}</span>
    <Edit onClick={showModal} />
    <EditBoard {...{ board, modalProps }} />
  </a>
);

export default Board;
