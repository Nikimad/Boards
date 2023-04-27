import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { addBoard } from "../../models/boards/boardsSlice";
import { selectBoardsArr, selectActiveBoardId } from "../../models/boards/boardsSelectors";

const NavbarContainer = (props) => {
  const items = useSelector(selectBoardsArr);
  const activeBoardId = useSelector(selectActiveBoardId);
  const createBoard = useAction(addBoard);

  return <Navbar { ...{...props, createBoard, activeBoardId, items}} />;
};

export default NavbarContainer;
