import "./Sidebar.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import BoardsNav from "../BoardsNav";
import Modal from "../Modal";
import BoardForm from "../BoardForm";

const Sidebar = ({ boardsCount, onClick, isHidden, showModal, modalProps, onSubmit }) => (
  <aside className="sidebar" aria-hidden={isHidden}>
    <div className="sidebar__presentation">
      <button className="sidebar__logo" onClick={onClick}>
        <Logo />
      </button>
      <h1 className="sidebar__title">Boards</h1>
    </div>
    <h2 className="sidebar__subtitle">All boards ({boardsCount})</h2>
    <BoardsNav onClick={onClick} />
    <button className="sidebar__button" onClick={showModal}>
      + Create New Board
    </button>
    <Modal { ...modalProps}>
      <BoardForm formTitle="Create New Board" onSubmit={onSubmit}>
        <label>
          <input className="form__submit" type="submit" value="Create New Board" />
        </label>
      </BoardForm>
    </Modal>
  </aside>
);

export default Sidebar;
