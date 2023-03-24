import "./Sidebar.scss";
import BoardFormModal from "../BoardFormModal";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import BoardsNav from "../BoardsNav";

const Sidebar = ({ boardsCount, onClick, isHidden, modalProps }) => (
  <aside className="sidebar" aria-hidden={isHidden}>
    <div className="sidebar__presentation">
      <button className="sidebar__logo" onClick={onClick}>
        <Logo />
      </button>
      <h1 className="sidebar__title">Boards</h1>
    </div>
    <h2 className="sidebar__subtitle">All boards ({boardsCount})</h2>
    <BoardsNav onClick={onClick} />
    <button className="sidebar__button" onClick={modalProps.showModal}>
      + Create New Board
    </button>
    <BoardFormModal {...modalProps} />
  </aside>
);

export default Sidebar;
