import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import Board from "./Board";
import { selectActiveBoardId } from "../../models/boards/boardsSelectors";
import { setActiveBoardId } from "../../models/boards/boardsSlice";

const BoardContainer = ({ board, toggleNav }) => {
  const isActive = useSelector(selectActiveBoardId) === board.id;
  const dispatchSetActiveBoardId = useAction(setActiveBoardId);
  const setActiveBoard = (e) => {
    e.preventDefault();
    dispatchSetActiveBoardId(board.id);
    toggleNav();
  };

  return <Board { ...{...board, isActive, setActiveBoard}} />;
};

export default BoardContainer;
