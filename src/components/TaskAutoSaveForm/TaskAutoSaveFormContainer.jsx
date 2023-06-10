import { Fragment, useEffect } from "react";
import useAction from "../../hooks/useAction";
import { editTask } from "../../models/tasks/tasksSlice";
import { Formik } from "formik";
import TaskAutoSaveForm from "./TaskAutoSaveForm";
import { useLocation, useParams } from "react-router-dom";
import { taskByIdSelector } from "../../models/tasks/tasksSelectors";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const TaskAutoSaveFormContainer = () => {
  const { pathname } = useLocation();
  const { taskId } = useParams();

  const isTaskPage = !pathname.endsWith("review");

  const task = useSelector(taskByIdSelector(taskId));

  const dispatchEditTask = useAction(editTask);

  const Wrapper = isTaskPage ? Fragment : Modal;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        subtasks: task.subtasks,
        checkedSubtasks: task.checkedSubtasks,
        status: task.status,
      }}
      onSubmit={(values) => dispatchEditTask({ id: task.id, ...values })}
    >
      {({ values, submitForm }) => {
        useEffect(() => {
          submitForm();
        }, [values, submitForm]);

        return (
          <Wrapper>
            <TaskAutoSaveForm subtasks={task.subtasks}>
              {!isTaskPage ? <h2>{task.title}</h2> : null}
            </TaskAutoSaveForm>
          </Wrapper>
        );
      }}
    </Formik>
  );
};

export default TaskAutoSaveFormContainer;
