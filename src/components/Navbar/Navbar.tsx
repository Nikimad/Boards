import Logo from "../../assets/svg/logo.svg?react";
import { Link } from "react-router";
import type { Board, PreviousLocationState } from "../../types";
import BoardLink from "../BoardLink";
import Searchbar from "../Searchbar";
import Loader from "../Loader";
import s from "./Navbar.module.scss";

interface NavbarProps {
  isHidden: boolean;
  boards: Board[];
  searchParams: string | null;
  previousLocation: PreviousLocationState;
  isLoading: boolean;
}

const Navbar = ({
  isHidden,
  boards,
  searchParams,
  previousLocation,
  isLoading,
}: NavbarProps) => (
  <div className={s.navbar} aria-hidden={isHidden}>
    <div className={s.navbar__header}>
      <Logo />
      <h1 className={s.navbar__header__title}>Boards</h1>
      <p className={s.navbar__header__text}>
        {Boolean(searchParams) ? "Found boards" : "All boards"}(
        {isLoading ? <Loader className={s.navbar__loader} /> : boards.length})
      </p>
    </div>
    <Searchbar
      param="board"
      placeholder="Search board"
      className={s.navbar__search}
    />
    <nav className={s.navbar__nav}>
      {boards.map((board) => (
        <BoardLink key={board.id} board={board} />
      ))}
    </nav>
    <Link
      to="create/board"
      state={previousLocation}
      className={s.navbar__link}
    >
      + Create New Board
    </Link>
  </div>
);

export default Navbar;
