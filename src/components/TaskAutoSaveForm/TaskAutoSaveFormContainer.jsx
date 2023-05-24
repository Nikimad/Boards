import { useEffect } from "react";
import PropTypes from "prop-types";
import useAction from "../../hooks/useAction";
import { editTask } from "../../models/tasks/tasksSlice";
import { Formik } from "formik";
import TaskAutoSaveForm from "./TaskAutoSaveForm";

const TaskAutoSaveFormContainer = ({ task }) => {
  const dispatchEditTask = useAction(editTask);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        subtasks: task.subtasks,
        checkedSubtasks: task.checkedSubtasks,
        status: task.status,
      }}
      onSubmit={(values) => dispatchEditTask({ id: task.id, ...values })}
    >
      {({ values, submitForm }) => {
        useEffect(() => {
          submitForm();
        }, [values, submitForm]);

        return <TaskAutoSaveForm subtasks={task.subtasks} />;
      }}
    </Formik>
  );
};

TaskAutoSaveFormContainer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default TaskAutoSaveFormContainer;
