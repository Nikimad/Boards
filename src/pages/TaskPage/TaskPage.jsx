import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useAction from "../../hooks/useAction";
import {
  tasksActions,
  tasksSelectors,
} from "../../redux/slices/tasks/tasksSlice";
import Task from "../../components/Task";
import EditTaskPage from "../TaskModalPage/EditTaskPage";

const TaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const task = useSelector((state) => tasksSelectors.selectById(state, taskId));
  const isError = useSelector(tasksSelectors.selectIsError);

  const getTask = useAction(tasksActions.getTask);

  useEffect(() => {
    if (!Boolean(task)) getTask(taskId);
  }, [task, getTask, taskId]);

  useEffect(() => {
    if (isError) navigate("/error");
  }, [isError, navigate]);

  return (
    task && (
      <Task>
        <EditTaskPage />
      </Task>
    )
  );
};

export default TaskPage;
