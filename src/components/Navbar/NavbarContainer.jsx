import { useLocation, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSlice";
import Navbar from "./Navbar";
import useAction from "../../hooks/useAction";

const NavbarContainer = () => {
  const { isHidden, toggleIsHidden } = useContext(HiddableContentContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("boards");

  const boards = useSelector(boardsSelectors.selectAll);
  const totalBoards = useSelector(boardsSelectors.selectTotal);

  return (
    <Navbar
      isHidden={isHidden}
      toggleIsHidden={toggleIsHidden}
      query={query}
      boards={boards}
      totalBoards={totalBoards}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default NavbarContainer;
