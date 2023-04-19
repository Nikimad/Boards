import TaskInteractionForm from "./TaskInteractionForm";
import { Formik } from "formik";
import useAction from "../../hooks/useAction";
import { editTask } from "../../models/tasks/tasksSlice";
import PropTypes from "prop-types";

const TaskInteractionFormContainer = ({
  id,
  status,
  subtasks,
  checkedSubtasks,
}) => {
  const dispatchEditTask = useAction(editTask);
  const handleSubmit = (values) => dispatchEditTask({ id, ...values });

  return (
    <Formik
      initialValues={{
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

        return <TaskInteractionForm {...{ subtasks, submitOnChange }} />;
      }}
    </Formik>
  );
};

TaskInteractionFormContainer.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  subtasks: PropTypes.array,
  checkedSubtasks: PropTypes.array,
};

export default TaskInteractionFormContainer;
