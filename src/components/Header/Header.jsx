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
  boardEditPath,
  taskEditPath,
  taskCreatePath,
  previousLocation,
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
        to={isTaskChosen ? taskEditPath : boardEditPath}
        className={s.header__editable}
        state={previousLocation}
      >
        <span className={s.header__title}>
          {isTaskChosen ? currentTask.title : currentBoard?.title}
        </span>
        <Edit />
      </Link>

      {Boolean(currentTask) ? null : (
        <Link
          to={taskCreatePath}
          state={previousLocation}
          className={s.header__button}
        >
          +<span className={s.header__button__text}> Add New Task</span>
        </Link>
      )}
    </header>
  </div>
);

Header.propTypes = {
  toggleNavbar: PropTypes.func,
  currentBoard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  isBoardChosen: PropTypes.bool,
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
  isTaskChosen: PropTypes.bool,
  boardEditPath: PropTypes.string,
  taskEditPath: PropTypes.string,
  taskCreatePath: PropTypes.string,
  previousLocation: PropTypes.shape({
    previousLocation: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object,
      key: PropTypes.string,
    }),
  }),
};

export default Header;
