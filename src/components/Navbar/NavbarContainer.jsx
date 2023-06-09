import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useSelector } from "react-redux";
import { allBoardsSelector } from "../../models/boards/boardsSelectors";
import getId from "../../helpers/getId";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { isHidden, toggleIsHidden } = useContext(HiddableContentContext);
  const { boardId } = useParams();
  const location = useLocation();
  const boards = useSelector(allBoardsSelector);

  return (
    <Navbar
      isHidden={isHidden}
      toggleIsHidden={toggleIsHidden}
      isToggleDisabled={!Boolean(boardId)}
      boards={boards}
      path={`create board/${getId()}`}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default NavbarContainer;
