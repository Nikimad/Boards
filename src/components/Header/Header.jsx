import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { Link } from "react-router-dom";
import s from "./Header.module.scss";

const Header = ({
  boardId,
  taskId,
  title,
  onTogglerClick,
  previousLocation,
}) => (
  <div className={s.header__wrapper}>
    <header className={cn(s.header)}>
      <button onClick={onTogglerClick}>
        <Logo />
      </button>
      <Link
        to={`/edit/board/${boardId}${taskId ? `/task/${taskId}` : ""}`}
        className={s.header__editable}
        state={previousLocation}
      >
        <span className={s.header__title}>
          { title }
        </span>
        <Edit />
      </Link>
      { !taskId &&
      <Link
        className={s.header__button}
        to={`/create/board/${boardId}/task`}
        state={previousLocation}
      >
      +<span className={s.header__button__text}> Add New Task</span>
      </Link>
      }
    </header>
  </div>
);

Header.propTypes = {
  boardId: PropTypes.string,
  taskId: PropTypes.string,
  title: PropTypes.string,
  onTogglerClick: PropTypes.func,
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
