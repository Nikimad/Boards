import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import useModal from "../../hooks/useModal";
import useAction from "../../hooks/useAction";

import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import TaskAutoSaveForm from "../TaskAutoSaveForm";

import { tasksDomainSelectors } from "../../models/tasksDomain/tasksDomainSelectors";
import { addTask, editTask, deleteTask } from "../../models/tasksDomain/tasksDomainThunks";

const TaskFormContainer = () => {
  const modalProps = useModal();
  const navigate = useNavigate();
  const { boardId, taskId, action } = useParams();
  const { state }  = useLocation();
  const previousSearchParams = new URLSearchParams(state?.previousLocation.search);

  const task = useSelector((state) => tasksDomainSelectors.selectById(state, taskId));

  const dispatchSubmitAction = useAction(
    action === "create" ? addTask : editTask
  );
  const dispatchRemoveTask = useAction(deleteTask);

  const handleSubmit = (values) => {
    dispatchSubmitAction({
      task: values,
      searchParams: previousSearchParams.get("task"),
    });
    if (action !== "review") modalProps.resetModal();
  };

  const hanldeRemove = () => {
    dispatchRemoveTask(task.id);
    navigate(`/board/${boardId}`);
    modalProps.resetModal();
  };

  return (
    <Formik
      enableReinitialize
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
    >
      {({ values, submitForm }) =>
        action ? (
          <Modal modalProps={modalProps}>
            {action === "review" ? (
              <TaskAutoSaveForm values={values} submitForm={submitForm} />
            ) : (
              <TaskForm values={values} isEdit={action === "edit"} onRemove={hanldeRemove} />
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
