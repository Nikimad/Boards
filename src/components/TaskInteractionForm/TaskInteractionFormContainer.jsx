import TaskInteractionForm from "./TaskInteractionForm";
import { Formik } from "formik";
import useAction from "../../hooks/useAction";
import { editTask } from "../../models/tasks/tasksSlice";
import PropTypes from "prop-types";

const TaskInteractionFormContainer = ({ task }) => {
  const { id, status, checkedSubtasks, subtasks } = task;
  const dispatchEditTask = useAction(editTask);
  const handleSubmit = (values) => dispatchEditTask({ id, ...values });

  return (
    <Formik
      initialValues={{
        subtasks,
        checkedSubtasks,
        status,
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, submitForm }) => {
        const submitOnChange = (e) => {
          handleChange(e);
          submitForm();
        };

        return (
          <TaskInteractionForm
            subtasks={subtasks}
            submitOnChange={submitOnChange}
          />
        );
      }}
    </Formik>
  );
};

TaskInteractionFormContainer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default TaskInteractionFormContainer;
