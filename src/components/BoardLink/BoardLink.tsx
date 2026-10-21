import cn from "classnames";
import { NavLink } from "react-router";
import Icon from "../../assets/svg/doc.svg?react";
import type { Board } from "../../types";
import s from "./BoardLink.module.scss";

interface BoardLinkProps {
  board: Board;
  onClick: () => void;
}

const BoardLink = ({ board, onClick }: BoardLinkProps) => (
  <NavLink
    to={`board/${board.id}`}
    onClick={onClick}
    className={({ isActive }) =>
      cn(s.boardlink, { [s.boardlink_active]: isActive })
    }
  >
    <Icon />
    {board.title}
  </NavLink>
);

export default BoardLink;
