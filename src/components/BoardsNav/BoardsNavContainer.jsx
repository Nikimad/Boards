import { useSelector } from "react-redux";
import { selectBoards } from "../../models/boards/boardsSelectors";
import BoardsNav from "./BoardsNav";

const BoardsNavContainer = (props) => {
  const boards = useSelector(selectBoards);

  return <BoardsNav {...props} boards={boards} />;
};

export default BoardsNavContainer;
