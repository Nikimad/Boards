import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";

const Header = ({
  onTogglerClick,
  currentBoard,
  currentTask,
  previousLocation,
}) => (
  <div className={s.header__wrapper}>
    <header className={cn(s.header)}>
      <button onClick={onTogglerClick}>
        <Logo />
      </button>
      <Link
        to={`edit/board/${currentBoard.id}/${
          Boolean(currentTask) ? `task/${currentTask.id}` : ""
        }`}
        className={s.header__editable}
        state={previousLocation}
      >
        <span className={s.header__title}>
          {Boolean(currentTask) ? currentTask.title : currentBoard.title}
        </span>
        <Edit />
      </Link>
      {Boolean(currentTask) ? null : (
        <Link
          to={`create/board/${currentBoard.id}/task`}
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
  onTogglerClick: PropTypes.func,
  currentBoard: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
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
