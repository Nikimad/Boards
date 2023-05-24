import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import s from "./Board.module.scss";

const Board = ({ title, isActive, selectBoard }) => (
  <a
    onClick={selectBoard}
    href={`/${title}`}
    className={cn(s.board, { [s.board_active]: isActive })}
  >
    <Icon />
    {title}
  </a>
);

Board.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  selectBoard: PropTypes.func,
};

export default Board;
