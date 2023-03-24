import "./BoardsNav.scss";
import Board from "../Board";

const BoardsNav = ({ onClick, boardsIds }) => (
  <nav className="boards__nav">
    {boardsIds.map((id) => (
      <Board key={id} id={id} onClick={onClick} />
    ))}
  </nav>
);

export default BoardsNav;
