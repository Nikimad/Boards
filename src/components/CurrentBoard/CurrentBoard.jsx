import "./CurrentBoard.scss";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import EditBoard from "../EditBoard";

const CurrentBoard = ({ onRemove, showModal, modalProps, board }) => (
  <div className="current-board">
    <h2 className="current-board__title">{board.title}</h2>
    <button className="current-board__edit" onClick={showModal}>
      <Edit aria-hidden="true" />
    </button>
    <EditBoard {...{ modalProps, board, onRemove }} />
  </div>
);

export default CurrentBoard;
