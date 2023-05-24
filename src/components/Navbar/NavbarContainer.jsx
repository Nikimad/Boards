import PropTypes from "prop-types";
import getId from "../../helpers/getId";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { addBoard } from "../../models/boards/boardsSlice";
import {
  allBoardsSelector,
} from "../../models/boards/boardsSelectors";
import { activeBoardIdSelector } from "../../models/view/viewSelectors";
import Navbar from "./Navbar";

const NavbarContainer = ({ isNavbarHidden, toggleNavbar }) => {
  const boards = useSelector(allBoardsSelector);
  const activeBoardId = useSelector(activeBoardIdSelector);

  const dispatchAddBoard = useAction(addBoard);
  const createBoard = (values) =>
    dispatchAddBoard({
      id: getId(),
      ...values,
    });

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
