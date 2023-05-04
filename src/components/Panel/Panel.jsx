import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import TaskPreview from "../TaskPreview";
import Task from "../Task";
import s from "./Panel.module.scss";

const Panel = ({ items, activeTask, activeBoardId }) => (
  <div className={cn(s.panel, {[s.panel__list]: Boolean(activeTask)})}>
    {Boolean(activeTask) ? (
      <Task task={activeTask} />
    ) : items.length > 0 ? (
      items.map((task) => <TaskPreview key={task.id} task={task} />)
    ) : (
      <div className={s.panel__plug}>
        <Icon width="3em" />
        <p>
          {Boolean(activeBoardId) ? "No tasks on this board yet" : "Choose board"}
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
