import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import { selectCurrentBoardId } from "../../models/observer/observerSelectors";
import { setBoard } from "../../models/observer/observerSlice";
import useAction from "../../hooks/useAction";
import Board from "./Board";

const BoardContainer = ({ id, onClick }) => {
  const board = useSelector((state) => boardsSelectors.selectById(state, id));
  const currentBoardId = useSelector(selectCurrentBoardId);

  const dispatchSetBoard = useAction(setBoard(id));

  const handleClick = (e) => {
    e.preventDefault();
    dispatchSetBoard();
    onClick();
  };

  return (
    <Board {...board} isCurrent={currentBoardId === id} onClick={handleClick} />
  );
};

export default BoardContainer;
