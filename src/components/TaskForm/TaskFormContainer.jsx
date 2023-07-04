import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import useModal from "../../hooks/useModal";
import useAction from "../../hooks/useAction";

import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import TaskAutoSaveForm from "../TaskAutoSaveForm";

import { tasksSelectors } from "../../models/tasks/tasksSelectors";
import { addTask, editTask, deleteTask } from "../../models/tasks/tasksSlice";

const TaskFormContainer = () => {
  const modalProps = useModal();
  const navigate = useNavigate();
  const { boardId, taskId, action } = useParams();

  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));

  const dispatchSubmitAction = useAction(
    action === "create" ? addTask : editTask
  );
  const dispatchRemoveTask = useAction(deleteTask);

  const handleSubmit = (values) => {
    dispatchSubmitAction(values);
    if (action !== "review") modalProps.resetModal();
  };

  const hanldeReset = () => {
    dispatchRemoveTask(task.id);
    navigate(`/board/${boardId}`);
    modalProps.resetModal();
  };

  return (
    <Formik
      enableReinitialize={Boolean(taskId)}
      initialValues={
        task ?? {
          boardId: +boardId,
          id: Date.now(),
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
      onReset={hanldeReset}
    >
      {({ values, submitForm }) =>
        action ? (
          <Modal modalProps={modalProps}>
            {action === "review" ? (
              <TaskAutoSaveForm values={values} submitForm={submitForm} />
            ) : (
              <TaskForm values={values} isEdit={action === "edit"} />
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
