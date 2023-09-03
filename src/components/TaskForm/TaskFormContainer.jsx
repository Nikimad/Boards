import { useNavigate, useParams, useLocation } from "react-router-dom";
import useModal from "../../hooks/useModal";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import TaskAutoSaveForm from "../TaskAutoSaveForm";

const TaskFormContainer = ({ onSubmit, onDelete, task }) => {
  const { action, boardId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const modalProps = useModal();

  const handleSubmit = (values) => {
    onSubmit({ values, boardId, searchParams: location.state?.previousSearchParams });
    if (action !== "review") modalProps.resetModal();
  };

  const hanldeRemove = () => {
    onDelete(task.id);
    navigate(`/board/${boardId}`);
    modalProps.resetModal();
  };

  return (
    <Formik
      enableReinitialize={action !== "review"}
      initialValues={
        task ?? {
          boardId: +boardId,
          title: "",
          description: "",
          checkedSubtasks: [],
          subtasks: [],
          status: "todo",
        }
      }
      validationSchema={Yup.object({
        title: Yup.string()
          .max(16, "Title must be 16 characters or less")
          .required("Title is required"),
        subtasks: Yup.array().of(
          Yup.object({
            title: Yup.string()
              .max(16, "Subtask title must be 16 characters or less")
              .required("Subtask title is required"),
          })
        ),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, initialValues, submitForm }) =>
        action ? (
          <Modal modalProps={modalProps}>
            {action === "review" ? (
              <TaskAutoSaveForm initialValues={initialValues} values={values} submitForm={submitForm} />
            ) : (
              <TaskForm
                values={values}
                isEdit={Boolean(task)}
                onRemove={hanldeRemove}
              />
            )}
          </Modal>
        ) : (
          <TaskAutoSaveForm initialValues={initialValues} values={values} submitForm={submitForm} />
        )
      }
    </Formik>
  );
};

TaskFormContainer.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
    ),
    checkedSubtasks: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TaskFormContainer;
