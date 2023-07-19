import PropTypes from "prop-types";
import Plug from "../Plug";
import Searchbar from "../Searchbar";
import TaskPreview from "../TaskPreview";
import s from "./Board.module.scss";

const Board = ({ tasks, searchParams, isLoading, isErr }) =>
  isErr ? (
    <Plug message="Oops something went wrong" />
  ) : !Boolean(searchParams) && tasks.length === 0 ? (
    <Plug isLoading={isLoading} message="No tasks on this board yet" />
  ) : (
    <>
      <Searchbar param="task" placeholder="Search task" />
      {tasks.length > 0 ? (
        <div className={s.board}>
          {tasks.map((task) => (
            <TaskPreview key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <Plug message="Can't find searched tasks" />
      )}
    </>
  );

Board.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      status: PropTypes.string,
      subtasks: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
      ),
      checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  searchParams: PropTypes.oneOfType([PropTypes.shape(null), PropTypes.string]),
  isLoading: PropTypes.bool,
  isErr: PropTypes.bool,
};

export default Board;
