import PropTypes from "prop-types";
import Plug from "../Plug";
import Searchbar from "../Searchbar";
import TaskPreview from "../TaskPreview";
import s from "./Board.module.scss";

const Board = ({ tasks, query, length }) => (
  <>
    <Searchbar param="tasks" placeholder="Search task" />
    <div className={s.board}>
      {tasks.map((task) => (
        <TaskPreview key={task.id} task={task} />
      ))}
    </div>
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
  query: PropTypes.string,
  filtredLength: PropTypes.number,
  length: PropTypes.number,
};

export default Board;
