import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";

const Header = ({
  toggleNavbar,
  currentBoard,
  isBoardChosen,
  currentTask,
  isTaskChosen,
  boardPath,
  taskEditPath,
  taskCreatePath,
  state,
}) => (
  <div className={s.header__wrapper}>
    <header
      className={cn(s.header, {
        [s.header_empty]: !isBoardChosen,
      })}
    >
      <button onClick={toggleNavbar}>
        <Logo />
      </button>

        <Link
          to={isTaskChosen ? taskEditPath : boardPath}
          className={s.header__editable}
          state={state}
        >
          <span className={s.header__title}>
            {isTaskChosen ? currentTask.title : currentBoard?.title}
          </span>
          <Edit />
        </Link>

      {Boolean(currentTask) ? null : (
        <Link to={taskCreatePath} state={state} className={s.header__button}>
          +<span className={s.header__button__text}> Add New Task</span>
        </Link>
      )}
    </header>
  </div>
);

Header.propTypes = {
  toggleNav: PropTypes.func,
  currentBoard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onEditBoard: PropTypes.func,
  onRemoveBoard: PropTypes.func,
  currentTask: PropTypes.shape({
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
