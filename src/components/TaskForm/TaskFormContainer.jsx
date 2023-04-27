import { Formik } from "formik";
import * as Yup from "yup";
import TaskForm from "./TaskForm";
import getId from "../../helpers/getId";
import PropTypes from "prop-types";

const TaskFormContainer = ({ initialValues, onSubmit, onReset, ...props }) => (
  <Formik
    initialValues={{
      title: "",
      description: "",
      checkedSubtasks: [],
      subtasks: [
        {
          title: "",
          id: getId(),
        },
      ],
      status: "todo",
      ...initialValues,
    }}
    validationSchema={Yup.object({
      title: Yup.string()
        .max(30, "Title must be 30 characters or less")
        .required("Title is required"),
      subtasks: Yup.array().of(
        Yup.object({
          title: Yup.string()
            .max(20, "Subtask title must be 20 characters or less")
            .required("Subtask title is required"),
        })
      ),
    })}
    onSubmit={(values) => onSubmit(values)}
    onReset={() => onReset()}
  >
    {({ values }) => <TaskForm {...{ ...props, values }} />}
  </Formik>
);

TaskFormContainer.propTypes = {
  initialValues: PropTypes.shape({
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
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

export default TaskFormContainer;
