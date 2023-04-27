import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import Board from "./Board";
import { selectActiveBoardId } from "../../models/boards/boardsSelectors";
import { setActiveBoardId } from "../../models/boards/boardsSlice";
import PropTypes from "prop-types";

const BoardContainer = ({ id, title, toggleNav }) => {
  const isActive = useSelector(selectActiveBoardId) === id;
  const dispatchSetActiveBoardId = useAction(setActiveBoardId);
  const setActiveBoard = (e) => {
    e.preventDefault();
    dispatchSetActiveBoardId(id);
    toggleNav();
  };

  return <Board {...{ title, isActive, setActiveBoard }} />;
};

BoardContainer.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  toggleNav: PropTypes.func,
};

export default BoardContainer;
