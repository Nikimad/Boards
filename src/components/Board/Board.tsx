import type { Task } from "../../types";
import Plug from "../Plug";
import Searchbar from "../Searchbar";
import TaskPreview from "../TaskPreview";
import s from "./Board.module.scss";

interface BoardProps {
  tasks: Task[];
  searchParams: string | null;
}

const Board = ({ tasks, searchParams }: BoardProps) => (
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

export default Board;
