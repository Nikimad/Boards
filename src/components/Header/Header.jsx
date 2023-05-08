import PropTypes from "prop-types";
import cn from "classnames";
import LogoToggler from "../LogoToggler";
import Modal from "../Modal";
import BoardForm from "../BoardForm";
import TaskForm from "../TaskForm";
import s from "./Header.module.scss";

const Header = ({
  toggleNavbar,
  activeBoard,
  onEditBoard,
  onRemoveBoard,
  activeTask,
  createTask,
  onEditTask,
  onRemoveTask,
}) => (
  <div className={s.header__wrapper}>
    <header
      className={cn(s.header, {
        [s.header_empty]: !Boolean(activeBoard),
      })}
    >
      <LogoToggler onClick={toggleNavbar} />
      <div className={s.header__active}>
        <Modal>
          <h2 className={s.header__active__title}>
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
          <button className={s.header__button}>
            +<span className={s.header__button__text}> Add New Task</span>
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

Header.propTypes = {
  toggleNav: PropTypes.func,
  activeBoard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onEditBoard: PropTypes.func,
  onRemoveBoard: PropTypes.func,
  activeTask: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    boardId: PropTypes.number,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  createTask: PropTypes.func,
  onEditTask: PropTypes.func,
  onRemoveTask: PropTypes.func,
};

export default Header;
