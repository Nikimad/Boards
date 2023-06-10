import PropTypes from "prop-types";
import { ReactComponent as View } from "../../assets/svg/view.svg";
import { Link } from "react-router-dom";
import s from "./TaskPreview.module.scss";

const TaskPreview = ({ task, onClick, reviewPath, previousLocation }) => (
  <div className={s.taskpreview}>
    <button onClick={onClick} className={s.taskpreview__content}>
      <h3 className={s.taskpreview__content__title}>{task.title}</h3>
      <p className={s.taskpreview__content__text}>
        {task.subtasks.length > 0
          ? `${task.checkedSubtasks.length} of ${task.subtasks.length} subtasks`
          : `Status: ${task.status}`}
      </p>
    </button>
    <Link
      state={previousLocation}
      to={reviewPath}
      className={s.taskpreview__openreview}
    >
      <View />
    </Link>
  </div>
);

TaskPreview.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func,
  reviewPath: PropTypes.string,
  previousLocation: PropTypes.shape({
    previousLocation: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object,
      key: PropTypes.string,
    }),
  }),
};

export default TaskPreview;
