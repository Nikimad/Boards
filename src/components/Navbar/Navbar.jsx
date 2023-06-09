import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import BoardLink from "../BoardLink";
import s from "./Navbar.module.scss";

const Navbar = ({
  isHidden,
  toggleIsHidden,
  isToggleDisabled,
  boards,
  path,
  previousLocation,
}) => (
  <div className={s.navbar} aria-hidden={isHidden}>
    <div className={s.navbar__header}>
      <button onClick={toggleIsHidden} disabled={isToggleDisabled}>
        <Logo />
      </button>
      <h1 className={s.navbar__header__title}>Boards</h1>
      <p className={s.navbar__header__text}>All boards ({boards.length})</p>
    </div>
    <nav className={s.navbar__nav}>
      {boards.map((board) => (
        <BoardLink onClick={toggleIsHidden} key={board.id} board={board} />
      ))}
    </nav>
    <Link to={path} state={previousLocation} className={s.navbar__link}>
      + Create New Board
    </Link>
  </div>
);

Navbar.propTypes = {
  isHidden: PropTypes.bool,
  toggleIsHidden: PropTypes.func,
  isToggleDisabled: PropTypes.bool,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      tasksIds: PropTypes.arrayOf(PropTypes.number),
    })
  ),
  path: PropTypes.string,
  previousLocation: PropTypes.shape({
    previousLocation: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object,
      key: PropTypes.string,
    }),
  }),
};

export default Navbar;
