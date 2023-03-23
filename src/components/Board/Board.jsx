import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";

const Board = ({ title, isCurrent, onClick }) => (
  <a
    className="board"
    href={`/${title}`}
    onClick={onClick}
    data-current={isCurrent}
  >
    <Icon width={"1.5em"} />
    {title}
  </a>
);

export default Board;
