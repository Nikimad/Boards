import { useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { isHidden } = useContext(HiddableContentContext);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("board");

  const boards = useSelector(boardsSelectors.selectByQuery(query));
  const totalBoards = useSelector(boardsSelectors.selectTotal);

  return (
    <Navbar
      isHidden={isHidden}
      query={query}
      boards={boards}
      totalBoards={totalBoards}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default NavbarContainer;
