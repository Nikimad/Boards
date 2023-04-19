import "./Panel.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import TaskPreview from "../TaskPreview";
import Task from "../Task";
import PropTypes from "prop-types";

const Panel = ({ items, activeTask, activeBoardId }) => (
  <div className={`panel ${Boolean(activeTask) ? "" : "panel__list"}`}>
    {Boolean(activeTask) ? (
      <Task task={activeTask} />
    ) : items.length > 0 ? (
      items.map((task) => <TaskPreview key={task.id} {...{ task }} />)
    ) : (
      <div className="panel__plug">
        <Icon width="3em" />
        <p>
          {Boolean(activeTask) ? "No tasks on this board yet" : "Choose board"}
        </p>
      </div>
    )}
  </div>
);

Panel.propTypes = {
  items: PropTypes.array,
  activeTask: PropTypes.object,
  activeBoardId: PropTypes.number,
};

export default Panel;
