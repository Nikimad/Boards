import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import useAction from "../../hooks/useAction";
import { useSelector } from "react-redux";
import { boardsDomainSelectors} from "../../models/boardsDomain/boardsDomainSelectors";
import { boardsUISelectors } from "../../models/boardsUI/boardsUISelectors";
import { fetchBoards } from "../../models/boardsDomain/boardsDomainThunks";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { isHidden } = useContext(HiddableContentContext);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("board");

  const boardsIds = useSelector(boardsUISelectors.selectAll);
  const boards = useSelector(boardsDomainSelectors.selectByIds(boardsIds));
  const totalBoards = useSelector(boardsDomainSelectors.selectTotal);
  
  const dispatchFetchBoards = useAction(fetchBoards);

  useEffect(() => {
    dispatchFetchBoards(query);
  }, [query, dispatchFetchBoards]);

  return (
    <Navbar
      isHidden={isHidden}
      boards={boards}
      totalBoards={totalBoards}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default NavbarContainer;
