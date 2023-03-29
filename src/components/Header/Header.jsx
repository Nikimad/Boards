import "./Header.scss";
import CurrentBoard from "../CurrentBoard";
import AddTask from "../AddTask";
import LogoToggler from "../LogoToggler";

const Header = ({ currentBoard, toggleNav }) => (
  <div className="header__wrapper">
    <header className="header" data-empty={!Boolean(currentBoard)}>
      <LogoToggler onClick={toggleNav} />
      {Boolean(currentBoard) ? (
        <CurrentBoard toggleNav={toggleNav} board={currentBoard} />
      ) : null}
      <AddTask />
    </header>
  </div>
);

export default Header;
