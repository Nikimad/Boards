import CurrentBoard from "./CurrentBoard";
import useModal from "../../hooks/useModal";
import useStateDepAction from "../../hooks/useStateDepAction";
import useAction from "../../hooks/useAction";
import { updateBoard, removeBoard } from "../../models/boards/boardsSlice";
import { selectCurrentTasksIds } from "../../models/observer/observerSelectors";
import { useSelector } from "react-redux";

const CurrentBoardContainer = ({ board, toggleNav }) => {
  const { id, ...boardsValues } = board;
  const { showModal, ...modalProps } = useModal();
  const currentTasksIds = useSelector(selectCurrentTasksIds);

  const dispatchStateDepUpdateBoard = useStateDepAction(updateBoard);
  const dispatchRemoveBoard = useAction(removeBoard({ id, tasks: currentTasksIds}));

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
