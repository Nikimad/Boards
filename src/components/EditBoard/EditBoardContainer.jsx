import { useSelector } from "react-redux";
import useStateDepAction from "../../hooks/useStateDepAction";
import useAction from "../../hooks/useAction";
import { updateBoard, removeBoard } from "../../models/boards/boardsSlice";
import { selectCurrentTasksIds } from "../../models/observer/observerSelectors";
import EditBoard from "./EditBoard";

const EditBoardContainer = ({ modalProps, board, onSubmit, onRemove }) => {
  const { id, ...values } = board;
  const tasksIds = useSelector(selectCurrentTasksIds);

  const dispatchStateDepUpdateBoard = useStateDepAction(updateBoard);
  const dispatchRemoveBoard = useAction(removeBoard({ id, tasks: tasksIds }));

  const handleUpdateBoard = (values) => {
    if (onSubmit) onSubmit();
    modalProps.resetModal();
    dispatchStateDepUpdateBoard({ id, changes: values });
  };

  const handleRemoveBoard = () => {
    if(onRemove) onRemove();
    modalProps.resetModal();
    setTimeout(dispatchRemoveBoard, 100);
  };

  return (
    <EditBoard
      modalProps={modalProps}
      initialValues={values}
      onSubmit={handleUpdateBoard}
      onRemove={handleRemoveBoard}
    />
  );
};

export default EditBoardContainer;
