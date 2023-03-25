import { Formik } from "formik";
import TaskForm from "./TaskForm";
import getTaskFormProps from "../../helpers/getTaskFormProps";

const TaskFormContainer = ({ initialValues, onSubmit, ...props }) => {
  return (
    <Formik
      {...getTaskFormProps(initialValues)}
      onSubmit={(values) => onSubmit(values)}
    >
      <TaskForm {...props} />
    </Formik>
  );
};

export default TaskFormContainer;
