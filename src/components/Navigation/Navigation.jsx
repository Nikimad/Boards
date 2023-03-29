import "./Navigation.scss";
import LogoToggler from "../LogoToggler";
import BoardsNav from "../BoardsNav";
import CreateBoard from "../CreateBoard";

const Navigation = ({ isNavHidden, toggleNav, boardsCount, currentBoardId }) => (
  <div className="navbar" aria-hidden={isNavHidden}>
    <div className="navbar__header">
      <LogoToggler onClick={toggleNav} isDisabled={!Boolean(currentBoardId)} />
      <h1 className="navbar__title">Boards</h1>
      <p className="navbar__counter">All boards ({boardsCount})</p>
    </div>
    <BoardsNav onClick={toggleNav} />
    <CreateBoard />
  </div>
);

export default Navigation;
