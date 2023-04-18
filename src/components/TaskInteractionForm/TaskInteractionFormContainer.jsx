import TaskInteractionForm from "./TaskInteractionForm";
import { Formik } from "formik";
import useAction from "../../hooks/useAction";
import { editTask } from "../../models/tasks/tasksSlice";

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

export default TaskInteractionFormContainer;
