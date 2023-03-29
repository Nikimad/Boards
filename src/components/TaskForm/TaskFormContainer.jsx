import { Formik } from "formik";
import TaskForm from "./TaskForm";
import getTaskFormProps from "../../helpers/getTaskFormProps";

const TaskFormContainer = ({ initialValues, onSubmit, onRemove, ...props }) => {
  return (
    <Formik
      {...getTaskFormProps(initialValues)}
      onSubmit={(values) => onSubmit(values)}
    >
      <TaskForm {...props} onRemove={onRemove} />
    </Formik>
  );
};

export default TaskFormContainer;
