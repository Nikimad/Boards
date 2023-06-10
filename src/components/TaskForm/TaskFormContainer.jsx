import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";
import useAction from "../../hooks/useAction";
import { addTask, editTask, removeTask } from "../../models/tasks/tasksSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../Modal";
import TaskForm from "./TaskForm";

const TaskFormContainer = () => {
  const navigate = useNavigate();
  const { boardId, taskId, action } = useParams();

  const task = useSelector(taskByIdSelector(taskId));

  const dispatchSubmitAction = useAction(
    action === "edit" ? editTask : addTask
  );
  const dispatchRemoveTask = useAction(removeTask);

  const onSubmit = (values) => dispatchSubmitAction(values);
  const onReset = () => {
    dispatchRemoveTask(task);
    navigate(`/board/${boardId}`);
  };

  return (
    <Modal>
      <Formik
        initialValues={
          task ?? {
            id: +taskId,
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
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {({ values }) => (
          <TaskForm values={values} isEdit={action === "edit"} />
        )}
      </Formik>
    </Modal>
  );
};

export default TaskFormContainer;
