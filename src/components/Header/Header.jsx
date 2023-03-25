import "./Header.scss";
import TaskForm from "../TaskForm";
import Modal from "../Modal";

const Header = ({ showModal, modalProps, currentBoard, onSubmit }) => (
  <header className="header">
    <h2 className="header__title">{currentBoard || "Choose board"}</h2>
    <button
      className="header__button"
      onClick={showModal}
      disabled={!Boolean(currentBoard)}
    >
      +<span className="header__button__text"> Add New Task</span>
    </button>
    <Modal {...modalProps}>
      <TaskForm formTitle="Add New Task" onSubmit={onSubmit}>
        <label>
          <input className="form__submit" type="submit" value="Add New Task" />
        </label>
      </TaskForm>
    </Modal>
  </header>
);

export default Header;
