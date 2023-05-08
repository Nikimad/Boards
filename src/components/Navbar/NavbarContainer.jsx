import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { addBoard } from "../../models/boards/boardsSlice";
import {
  allBoardsSelector,
  activeBoardIdSelector,
} from "../../models/boards/boardsSelectors";

const NavbarContainer = ({ isNavbarHidden, toggleNavbar }) => {
  const boards = useSelector(allBoardsSelector);
  const activeBoardId = useSelector(activeBoardIdSelector);

  const createBoard = useAction(addBoard);

  return (
    <Navbar
      isNavbarHidden={isNavbarHidden}
      toggleNavbar={toggleNavbar}
      createBoard={createBoard}
      activeBoardId={activeBoardId}
      boards={boards}
    />
  );
};

NavbarContainer.propTypes = {
  isNavbarHidden: PropTypes.bool,
  toggleNavbar: PropTypes.func,
};

export default NavbarContainer;
