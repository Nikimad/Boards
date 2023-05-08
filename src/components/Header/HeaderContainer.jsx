import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import Header from "./Header";
import { selectActiveBoard } from "../../models/boards/boardsSelectors";
import { selectActiveTask } from "../../models/tasks/tasksSelectors";
import { editBoard, removeBoard } from "../../models/boards/boardsSlice";
import { addTask, editTask, removeTask } from "../../models/tasks/tasksSlice";

const HeaderContainer = ({ isNavbarHidden, toggleNavbar }) => {
  const activeBoard = useSelector(selectActiveBoard);
  const activeTask = useSelector(selectActiveTask);

  const dispatchEditBoard = useAction(editBoard);
  const dispatchRemoveBoard = useAction(removeBoard);
  const dispatchAddTask = useAction(addTask);
  const dispatchEditTask = useAction(editTask);
  const dispatchRemoveTask = useAction(removeTask);

  const onEditBoard = (values) => dispatchEditBoard(values);
  const onRemoveBoard = () => {
    if (isNavbarHidden) toggleNavbar();
    dispatchRemoveBoard(activeBoard.id);
  }
  const createTask = (values) =>
    dispatchAddTask({ boardId: activeBoard.id, ...values });
  const onEditTask = (values) => dispatchEditTask(values);
  const onRemoveTask = () => dispatchRemoveTask(activeTask.id);

  return (
    <Header
      toggleNavbar={toggleNavbar}
      activeBoard={activeBoard}
      onEditBoard={onEditBoard}
      onRemoveBoard={onRemoveBoard}
      activeTask={activeTask}
      createTask={createTask}
      onEditTask={onEditTask}
      onRemoveTask={onRemoveTask}
    />
  );
};

HeaderContainer.propTypes = {
    isNavbarHidden: PropTypes.bool,
    toggleNav: PropTypes.func,
};

export default HeaderContainer;
