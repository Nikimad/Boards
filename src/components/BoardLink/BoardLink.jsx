import PropTypes from "prop-types";
import cn from "classnames";
import { NavLink } from "react-router";
// TODO(svg-migration): вернуть оригинальный SVG (doc.svg)
import Icon from "../SvgPlaceholder";
import s from "./BoardLink.module.scss";

const BoardLink = ({ board, onClick }) => (
  <NavLink
    to={`board/${board.id}`}
    onClick={onClick}
    className={({ isActive }) =>
      cn(s.boardlink, { [s.boardlink_active]: isActive })
    }
  >
    <Icon />
    {board.title}
  </NavLink>
);

BoardLink.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default BoardLink;
