import "./BoardsNav.scss";
import Board from "../Board";

const BoardsNav = ({ onClick, boards }) => (
  <nav className="boards__nav">
    {boards.map((board) => (
      <Board key={board.id} board={board} onClick={onClick} />
    ))}
  </nav>
);

export default BoardsNav;
