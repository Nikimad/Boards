import PropTypes from 'prop-types';
import cn from 'classnames';
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import s from "./Board.module.scss";

const Board = ({ board, isActive, setActiveBoard }) => (
  <a
    onClick={setActiveBoard}
    href={`/${board.title}`}
    className={cn(s.board, {[s.board_active]: isActive })}
  >
    <Icon />
    <span className={s.board__title}>{board.title}</span>
  </a>
);

Board.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  setActiveBoard: PropTypes.func,
};

export default Board;
