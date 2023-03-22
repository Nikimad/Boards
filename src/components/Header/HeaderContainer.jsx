import Header from "./Header";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectCurrentBoardId } from "../../models/observer/observerSelectors";
import { boardsSelectors } from "../../models/boards/boardsSelectors";

const HeaderContainer = () => {
  const modalProps = useModal();
  const currentBoardId = useSelector(selectCurrentBoardId);
  const currentBoard = useSelector((state) => boardsSelectors.selectById(state, currentBoardId));

  return (
    <Header
      modalProps={modalProps}
      currentBoard={currentBoard?.title}
    />
  );
};

export default HeaderContainer;
