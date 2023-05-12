import PropTypes from "prop-types";
import LayoutToggler from "../LayoutToggler";
import Board from "../Board";
import Modal from "../Modal";
import BoardForm from "../BoardForm";
import s from "./Navbar.module.scss";

const Navbar = ({
  isNavbarHidden,
  toggleNavbar,
  activeBoardId,
  createBoard,
  boards,
}) => (
  <div className={s.navbar} aria-hidden={isNavbarHidden}>
    <div className={s.navbar__header}>
      <LayoutToggler
        onClick={toggleNavbar}
        disabled={!Boolean(activeBoardId)}
      />
      <h1>Boards</h1>
      <p className={s.navbar__header__text}>
        All boards ({boards.length ?? 0})
      </p>
    </div>
    <nav className={s.navbar__nav}>
      {boards.map((board) => (
        <Board key={board.id} board={board} toggleNavbar={toggleNavbar} />
      ))}
    </nav>
    <Modal>
      <button className={s.navbar__button}>+ Create New Board</button>
      <BoardForm
        onSubmit={createBoard}
        formTitle="Create new board"
        submitTitle="Create board"
      />
    </Modal>
  </div>
);

Navbar.propTypes = {
  isNavbarHidden: PropTypes.bool,
  toggleNavbar: PropTypes.func,
  activeBoardId: PropTypes.number,
  createBoard: PropTypes.func,
  boards: PropTypes.array,
};

export default Navbar;
