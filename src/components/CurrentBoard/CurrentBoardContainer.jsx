import CurrentBoard from "./CurrentBoard";
import useModal from "../../hooks/useModal";
import useStateDepAction from "../../hooks/useStateDepAction";
import useAction from "../../hooks/useAction";
import { updateBoard, removeBoard } from "../../models/boards/boardsSlice";

const CurrentBoardContainer = ({ board, toggleNav }) => {
  const { id, ...boardsValues } = board;
  const { showModal, ...modalProps } = useModal();

  const dispatchStateDepUpdateBoard = useStateDepAction(updateBoard);
  const dispatchRemoveBoard = useAction(removeBoard(id));

  const handleUpdateBoard = (values) => {
    dispatchStateDepUpdateBoard({ id, changes: values });
    modalProps.resetModal();
  };

  const handleRemove = () => {
    if (Boolean(toggleNav)) toggleNav();
    modalProps.resetModal();
    dispatchRemoveBoard();
  };

  return (
    <CurrentBoard
      {...{ showModal, modalProps, boardsValues }}
      onSubmit={handleUpdateBoard}
      onRemove={handleRemove}
    />
  );
};

export default CurrentBoardContainer;
