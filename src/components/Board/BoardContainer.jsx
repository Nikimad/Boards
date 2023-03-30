import { useSelector } from "react-redux";
import { selectCurrentBoardId, selectCurrentTasksIds } from "../../models/observer/observerSelectors";
import { setBoard } from "../../models/observer/observerSlice";
import { updateBoard, removeBoard } from "../../models/boards/boardsSlice";
import useAction from "../../hooks/useAction";
import Board from "./Board";
import useModal from "../../hooks/useModal";
import useStateDepAction from "../../hooks/useStateDepAction";


const BoardContainer = ({ board, onClick }) => {
  const { id , ...boardValues } = board;
  const currentBoardId = useSelector(selectCurrentBoardId);
  const currentTasksIds = useSelector(selectCurrentTasksIds);

  const dispatchSetBoard = useAction(setBoard(id));
  const dispatchRemoveBoard = useAction(removeBoard({ id, tasks: currentTasksIds}));

  const handleClick = (e) => {
    e.preventDefault();
    dispatchSetBoard();
    onClick();
  };

  const { showModal, ...modalProps } = useModal();
  const dispatchStateDepUpdateBoard = useStateDepAction(updateBoard);
  const handleUpdateBoard = (values) => {
    dispatchStateDepUpdateBoard({id, changes: values});
    modalProps.resetModal();
  };
  const handleRemoveBoard = () => {
    setTimeout(dispatchRemoveBoard, 100);
    modalProps.resetModal();
  };

  return (
    <Board
      boardValues={boardValues}
      isCurrent={currentBoardId === id}
      onClick={handleClick}
      onSubmit={handleUpdateBoard}
      onRemove={handleRemoveBoard}
      showModal={showModal}
      modalProps={modalProps}
    />
  );
};

export default BoardContainer;
