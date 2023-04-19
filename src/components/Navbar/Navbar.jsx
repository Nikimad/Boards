import "./Navbar.scss";
import LogoToggler from "../LogoToggler";
import Board from "../Board";
import Modal from "../Modal";
import BoardForm from "../BoardForm";
import PropTypes from "prop-types";

const Navbar = ({
  isNavHidden,
  toggleNav,
  activeBoardId,
  createBoard,
  items,
}) => (
  <div className="navbar" aria-hidden={isNavHidden}>
    <div className="navbar__header">
      <LogoToggler onClick={toggleNav} isDisabled={!Boolean(activeBoardId)} />
      <h1 className="navbar__title">Boards</h1>
      <p className="navbar__counter">All boards ({items.length ?? 0})</p>
    </div>
    <nav className="navbar__nav">
      {items.map((board) => (
        <Board key={board.id} {...{ ...board, toggleNav }} />
      ))}
    </nav>
    <Modal>
      <button className="navbar__button">+ Create New Board</button>
      <BoardForm
        onSubmit={createBoard}
        formTitle="Create new board"
        submitTitle="Create board"
      />
    </Modal>
  </div>
);

Navbar.propTypes = {
  isNavHidden: PropTypes.bool,
  toggleNav: PropTypes.func,
  activeBoardId: PropTypes.number,
  createBoard: PropTypes.func,
  items: PropTypes.array,
};

export default Navbar;
