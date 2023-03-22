import "./Header.scss";
import TaskFormModal from "../TaskFormModal";

const Header = ({ modalProps, currentBoard }) => (
  <header className="header">
    <h2 className="header__title">{currentBoard || "Choose board"}</h2>
    <button className="header__button" onClick={modalProps.showModal} disabled={!Boolean(currentBoard)}>
      +<span className="header__button__text"> Add New Task</span>
    </button>
    <TaskFormModal {...modalProps} />
  </header>
);

export default Header;
