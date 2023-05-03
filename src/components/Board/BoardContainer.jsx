import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import { selectActiveBoardId } from "../../models/boards/boardsSelectors";
import { setActiveBoardId } from "../../models/boards/boardsSlice";
import Board from "./Board";

const BoardContainer = ({ board, toggleNav }) => {
  const activeBoardId = useSelector(selectActiveBoardId);
  const dispatchSetActiveBoardId = useAction(setActiveBoardId);
  const setActiveBoard = (e) => {
    e.preventDefault();
    dispatchSetActiveBoardId(board.id);
    toggleNav();
  };

  return <Board board={board} isActive={activeBoardId === board.id} setActiveBoard={setActiveBoard} />;
};

BoardContainer.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  toggleNav: PropTypes.func,
};

export default BoardContainer;
