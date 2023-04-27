import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import PropTypes from 'prop-types';

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

Board.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  setActiveBoard: PropTypes.func,
};

export default Board;
