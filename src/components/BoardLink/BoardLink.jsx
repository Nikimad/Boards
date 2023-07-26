import PropTypes from "prop-types";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
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
