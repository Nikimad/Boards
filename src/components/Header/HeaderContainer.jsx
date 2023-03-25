import Header from "./Header";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../models/boards/boardsSelectors";
import getId from "../../helpers/getId";
import useStateDepAction from "../../hooks/useStateDepAction";
import { addTask } from "../../models/tasks/tasksSlice";

const HeaderContainer = () => {
  const { showModal, ...modalProps } = useModal();
  const dispatchStateDepAddTask = useStateDepAction(addTask);
  const currentBoard = useSelector(selectCurrentBoard);

  const handleAddTask = (values) => {
    dispatchStateDepAddTask({ id: getId(), ...values});
    modalProps.resetModal();
  };

  return (
    <Header
      showModal={showModal}
      modalProps={modalProps}
      onSubmit={handleAddTask}
      currentBoard={currentBoard?.title}
    />
  );
};

export default HeaderContainer;
