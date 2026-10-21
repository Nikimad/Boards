import { useEffect } from "react";
import { useParams } from "react-router";
import type { TaskFormValues } from "../TaskForm/TaskFormContainer";
import TaskAutoSaveForm from "./TaskAutoSaveForm";

interface TaskAutoSaveFormContainerProps {
  values: TaskFormValues;
  submitForm: () => Promise<unknown>;
}

const TaskAutoSaveFormContainer = ({ values, submitForm }: TaskAutoSaveFormContainerProps) => {
  const { action } = useParams();

  useEffect(() => {
    submitForm();
  }, [values, submitForm]);

  return (
    <TaskAutoSaveForm subtasks={values.subtasks}>
      {action === "review" ? <h2>{values.title}</h2> : null}
    </TaskAutoSaveForm>
  );
};

export default TaskAutoSaveFormContainer;
