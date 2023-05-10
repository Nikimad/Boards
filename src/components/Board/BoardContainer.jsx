import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { activeBoardIdSelector } from "../../models/boards/boardsSelectors";
import { setActiveBoardId } from "../../models/boards/boardsSlice";
import Board from "./Board";

const BoardContainer = ({ board, toggleNavbar }) => {
  const { id, title } = board;

  const activeBoardId = useSelector(activeBoardIdSelector);
  const dispatchSetActiveBoardId = useAction(setActiveBoardId);

  const selectBoard = (e) => {
    e.preventDefault();
    dispatchSetActiveBoardId(id);
    toggleNavbar();
  };

  return (
    <Board
      title={title}
      isActive={activeBoardId === id}
      selectBoard={selectBoard}
    />
  );
};

BoardContainer.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  toggleNavbar: PropTypes.func,
};

export default BoardContainer;
