import "./Header.scss";
import LogoToggler from "../LogoToggler";
import Modal from "../Modal";
import BoardForm from "../BoardForm";
import TaskForm from "../TaskForm";

const Header = ({
  toggleNav,
  activeBoard,
  onEditBoard,
  onRemoveBoard,
  activeTask,
  createTask,
  onEditTask,
  onRemoveTask,
}) => (
  <div className="header__wrapper">
    <header className={`header${!Boolean(activeBoard) ? " header_empty" : ""}`}>
      <LogoToggler onClick={toggleNav} />
      <div className="header__active">
        <Modal>
          <h2 className="header__active__title">
            {Boolean(activeTask) ? activeTask?.title : activeBoard?.title}
          </h2>
          {Boolean(activeTask) ? (
            <TaskForm
              initialValues={activeTask}
              isEdit={true}
              onSubmit={onEditTask}
              onReset={onRemoveTask}
              formTitle="Edit task"
              submitTitle="Edit"
            />
          ) : (
            <BoardForm
              initialValues={activeBoard}
              isEdit={true}
              onSubmit={onEditBoard}
              onReset={onRemoveBoard}
              formTitle="Edit board"
              submitTitle="Edit"
            />
          )}
        </Modal>
      </div>
      {Boolean(activeTask) ? null : (
        <Modal>
          <button className="header__button">
            +<span className="header__button__text"> Add New Task</span>
          </button>
          <TaskForm
            formTitle="Add new task"
            submitTitle="Add task"
            onSubmit={createTask}
          />
        </Modal>
      )}
    </header>
  </div>
);

export default Header;
