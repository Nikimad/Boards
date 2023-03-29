import { useSelector } from "react-redux";
import { selectBoardsCount } from "../../models/boards/boardsSelectors";
import { selectCurrentBoardId } from "../../models/observer/observerSelectors";
import Navigation from "./Navigation";

const NavigationContainer = (props) => {
  const boardsCount = useSelector(selectBoardsCount);
  const currentBoardId = useSelector(selectCurrentBoardId);

  const s = useSelector(q => q);

  console.log(s);

  return <Navigation {...{ ...props, boardsCount, currentBoardId }} />;
};

export default NavigationContainer;
