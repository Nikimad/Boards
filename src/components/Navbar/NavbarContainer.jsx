import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { addBoard } from "../../models/boards/boardsSlice";
import {
  selectBoardsArr,
  selectActiveBoardId,
} from "../../models/boards/boardsSelectors";

const NavbarContainer = ({ isNavHidden, toggleNav }) => {
  const items = useSelector(selectBoardsArr);
  const activeBoardId = useSelector(selectActiveBoardId);
  const createBoard = useAction(addBoard);

  return (
    <Navbar
      isNavHidden={isNavHidden}
      toggleNav={toggleNav}
      createBoard={createBoard}
      activeBoardId={activeBoardId}
      items={items}
    />
  );
};

NavbarContainer.propTypes = {
  isNavHidden: PropTypes.bool,
  toggleNav: PropTypes.func,
};

export default NavbarContainer;
