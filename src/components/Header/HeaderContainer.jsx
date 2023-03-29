import Header from "./Header";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../models/boards/boardsSelectors";

const HeaderContainer = (props) => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <Header
      { ...props }
      currentBoard={currentBoard}
    />
  );
};

export default HeaderContainer;
