import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import useAction from "../../hooks/useAction";
import useDebouncedCallback from "../../hooks/useDebounceCallback";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/boardsSelectors";
import { getBoards } from "../../models/boards/boardsThunks";
import HiddableContentContext from "../../context/HiddableContentContext";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { isHidden } = useContext(HiddableContentContext);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const boardSearchParams = searchParams.get("board");

  const visibleBoardsIds = useSelector(boardsSelectors.selectVisibleIds);
  const boards = useSelector(boardsSelectors.selectByIds(visibleBoardsIds));
  const totalBoards = useSelector(boardsSelectors.selectTotal);
  const boardsLoadingStatus = useSelector(boardsSelectors.selectLoadingStatus);
  const boardsError = useSelector(boardsSelectors.selectError);

  const dispatchGetBoards = useAction(getBoards);
  const debouncedDispatchGetBoards = useDebouncedCallback(
    dispatchGetBoards,
    250
  );

  useEffect(() => {
    debouncedDispatchGetBoards(boardSearchParams);
    return () => {
      debouncedDispatchGetBoards.cancel();
    };
  }, [debouncedDispatchGetBoards, boardSearchParams]);

  return (
    <Navbar
      isHidden={isHidden}
      boards={boards}
      totalBoards={totalBoards}
      searchParams={boardSearchParams}
      previousLocation={{ previousLocation: location }}
      isLoading={boardsLoadingStatus === "loading"}
      isErr={Boolean(boardsError)}
    />
  );
};

export default NavbarContainer;
