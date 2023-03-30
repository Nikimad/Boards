import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../models/observer/observerSelectors";
import { setBoard } from "../../models/observer/observerSlice";
import useAction from "../../hooks/useAction";
import Board from "./Board";
import useModal from "../../hooks/useModal";

const BoardContainer = ({ board, onClick }) => {
  const currentBoardId = useSelector(selectCurrentBoardId);

  const dispatchSetBoard = useAction(setBoard(board.id));

  const handleClick = (e) => {
    e.preventDefault();
    dispatchSetBoard();
    onClick();
  };

  const { showModal, ...modalProps } = useModal();

  return (
    <Board
      board={board}
      isCurrent={currentBoardId === board.id}
      onClick={handleClick}
      showModal={showModal}
      modalProps={modalProps}
    />
  );
};

export default BoardContainer;
