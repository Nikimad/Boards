import PropTypes from "prop-types";
import Plug from "../Plug";
import Searchbar from "../Searchbar";
import TaskPreview from "../TaskPreview";
import s from "./Board.module.scss";

const Board = ({ tasks, searchParams }) => (
  <div className={s.board__wrapper}>
    <Searchbar param="task" placeholder="Search task" />
    { tasks.length > 0 ?
      <div className={s.board}>
        {tasks.map((task) => (
          <TaskPreview key={task.id} task={task} />
        ))}
      </div> :
      Boolean(searchParams) ?  
        (<Plug message="Can't find requested tasks" />) : 
        (<Plug message="No tasks on this board yet" />)
    }
  </div>
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
};

export default Board;
