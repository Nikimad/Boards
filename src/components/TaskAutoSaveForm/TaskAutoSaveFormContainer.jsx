import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskAutoSaveForm from "./TaskAutoSaveForm";

const TaskAutoSaveFormContainer = ({ values, submitForm }) => {
  const { action } = useParams();

  useEffect(() => {
    submitForm();
  }, [values, submitForm]);

  return (
    <TaskAutoSaveForm subtasks={values.subtasks}>
      {action === "review" ? <h2>{values.title}</h2> : null}
    </TaskAutoSaveForm>
  );
};

TaskAutoSaveFormContainer.propTypes = {
  values: PropTypes.shape({
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
  submitForm: PropTypes.func,
};

export default TaskAutoSaveFormContainer;
