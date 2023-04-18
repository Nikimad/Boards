import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";

const Board = ({ title, isActive, setActiveBoard }) => (
  <a
    onClick={setActiveBoard}
    href={`/${title}`}
    className={`board${isActive ? " board_active" : ""}`}
  >
    <Icon />
    <span className="board__title">{title}</span>
  </a>
);

export default Board;
