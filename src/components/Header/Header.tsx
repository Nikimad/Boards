import cn from "classnames";
import Logo from "../../assets/svg/logo.svg?react";
import Edit from "../../assets/svg/edit.svg?react";
import { Link } from "react-router";
import type { PreviousLocationState } from "../../types";
import s from "./Header.module.scss";

interface HeaderProps {
  boardId?: string;
  taskId?: string;
  title?: string;
  onTogglerClick: () => void;
  previousLocation: PreviousLocationState;
}

const Header = ({
  boardId,
  taskId,
  title,
  onTogglerClick,
  previousLocation,
}: HeaderProps) => (
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
);

export default Header;
