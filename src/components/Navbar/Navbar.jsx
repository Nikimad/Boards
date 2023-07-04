import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import BoardLink from "../BoardLink";
import Searchbar from "../Searchbar";
import s from "./Navbar.module.scss";

const Navbar = ({
  isHidden,
  query,
  boards,
  totalBoards,
  previousLocation,
}) => (
  <div className={s.navbar} aria-hidden={isHidden}>
    <div className={s.navbar__header}>
      <Logo />
      <h1 className={s.navbar__header__title}>Boards</h1>
      <p className={s.navbar__header__text}>All boards ({totalBoards})</p>
    </div>
    <nav className={s.navbar__nav}>
      {boards.map((board) => (
        <BoardLink key={board.id} board={board} />
      ))}
    </nav>
    <Link to="create/board" state={previousLocation} className={s.navbar__link}>
      + Create New Board
    </Link>
    { totalBoards > 0 ? (
      <Searchbar
        param="board"
        placeholder="Search board"
        className={s.navbar__search}
      />
    ) : null}
  </div>
);

Navbar.propTypes = {
  isHidden: PropTypes.bool,
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      createdAt: PropTypes.number,
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
