import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import BoardsNav from "./BoardsNav";

const BoardsNavContainer = (props) => {
  const boardsIds = useSelector(boardsSelectors.selectIds);

  return <BoardsNav {...props} boardsIds={boardsIds} />;
};

export default BoardsNavContainer;
