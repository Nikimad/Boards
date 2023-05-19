import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import TaskPreview from "../TaskPreview";
import Task from "../Task";
import Searchbar from "../Searchbar";
import s from "./Panel.module.scss";

const Panel = ({
  task,
  tasks,
  length,
  genLength,
  onChange,
  query,
  isBoardChosen,
  isTaskChosen,
}) => (
  <div className={s.panel}>
    {isTaskChosen ? (
      <Task task={task} />
    ) : (
      <>
        {genLength > 0 ? (
          <>
            <Searchbar />
            {length === 0 ? (
              <div className={s.panel__plug}>
                <p>No tasks on this board contain: {query}</p>
              </div>
            ) : (
              <div className={s.panel__list}>
                {tasks.map((task) => (
                  <TaskPreview key={task.id} task={task} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={s.panel__plug}>
            <Icon width="3em" />
            <p>
              {isBoardChosen ? "No tasks on this board yet" : "Choose board"}
            </p>
          </div>
        )}
      </>
    )}
  </div>
);

Panel.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
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
  length: PropTypes.number,
  genLength: PropTypes.number,
  onChange: PropTypes.func,
  query: PropTypes.string,
  isBoardChosen: PropTypes.bool,
  isTaskChosen: PropTypes.bool,
};

export default Panel;
