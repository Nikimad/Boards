import PropTypes from "prop-types";
import useAction from "../../hooks/useAction";
import { setActiveTaskId } from "../../models/tasks/tasksSlice";
import TaskPreview from "./TaskPreview";

const TaskPreviewContainer = ({ task }) => {
  const dispatchSetActiveTaskId = useAction(setActiveTaskId);
  const setActiveTask = () => dispatchSetActiveTaskId(task.id);

  return (
    <TaskPreview
      task={task}
      setActiveTask={setActiveTask}
    />
  );
};

TaskPreviewContainer.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    boardId: PropTypes.number,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }),
};

export default TaskPreviewContainer;
