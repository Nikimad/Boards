import { useSelector } from "react-redux";
import { tasksSelectors } from "../../models/tasks/tasksSelectors";
import useModal from "../../hooks/useModal";
import Task from "./Task";

const TaskContainer = ({id}) => {
  const task = useSelector((state) => tasksSelectors.selectById(state, id));
  const modalProps = useModal();

  return <Task {...task} { ...modalProps } />;
};

export default TaskContainer;
