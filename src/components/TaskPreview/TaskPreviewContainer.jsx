import TaskPreview from "./TaskPreview";
import { Formik } from "formik";
import useAction from "../../hooks/useAction";
import { setActiveTaskId, editTask } from "../../models/tasks/tasksSlice";

const TaskPreviewContainer = ({ id, checkedSubtasks, status, ...props }) => {
  const dispatchSetActiveTaskId = useAction(setActiveTaskId);
  const dispatchEditTask = useAction(editTask);

  const setActiveTask = () => dispatchSetActiveTaskId(id);
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

        return (
          <TaskPreview
            {...{
              ...props,
              status,
              checkedSubtasks,
              setActiveTask,
              submitOnChange,
            }}
          />
        );
      }}
    </Formik>
  );
};

export default TaskPreviewContainer;
