import { useNavigate, useParams } from "react-router";
import useModal from "../../hooks/useModal";
import * as Yup from "yup";
import { Formik } from "formik";
import type { NewTask, Task } from "../../types";
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import TaskAutoSaveForm from "../TaskAutoSaveForm";

const validationSchema = Yup.object({
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
});

// not InferType: the schema covers only title and subtask titles, values carry the whole task
export type TaskFormValues = NewTask & Partial<Pick<Task, "id">>;

interface TaskFormContainerProps {
  task?: Task;
  onSubmit: (values: TaskFormValues) => void;
  onDelete?: (id: number) => void;
}

const TaskFormContainer = ({ onSubmit, onDelete, task }: TaskFormContainerProps) => {
  const { action, boardId } = useParams();
  const modalProps = useModal();
  const navigate = useNavigate();

  const handleSubmit = (values: TaskFormValues) => {
    // removing a subtask leaves its id in checkedSubtasks
    const checkedSubtasks = values.checkedSubtasks.filter((id) =>
      values.subtasks.some((subtask) => `${subtask.id}` === id)
    );
    onSubmit({ ...values, checkedSubtasks });
    if (action !== "review") modalProps.resetModal();
  };

  // Remove is rendered only when `task` exists, and edit page always passes onDelete
  const hanldeRemove = () => {
    onDelete!(task!.id);
    navigate(`/board/${boardId}`);
    modalProps.resetModal();
  };

  return (
    <Formik<TaskFormValues>
      enableReinitialize
      initialValues={
        task ?? {
          // TODO(ts): boardId is an optional route param, NaN when missing
          boardId: Number(boardId),
          title: "",
          description: "",
          checkedSubtasks: [],
          subtasks: [],
          status: "todo",
        }
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, submitForm }) =>
        action ? (
          <Modal modalProps={modalProps}>
            {action === "review" ? (
              <TaskAutoSaveForm values={values} submitForm={submitForm} />
            ) : (
              <TaskForm
                values={values}
                isEdit={Boolean(task)}
                onRemove={hanldeRemove}
              />
            )}
          </Modal>
        ) : (
          <TaskAutoSaveForm values={values} submitForm={submitForm} />
        )
      }
    </Formik>
  );
};

export default TaskFormContainer;
