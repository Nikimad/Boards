import { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../../models/boards/selectors";
import HiddableContentContext from "../../context/HiddableContentContext";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { isHidden } = useContext(HiddableContentContext);

  const boardSearchParams = searchParams.get("board");
  const { entities: boards, isLoading } = useSelector(
    boardsSelectors.selectData
  );

  return (
    <Navbar
      isHidden={isHidden}
      boards={boards}
      searchParams={boardSearchParams}
      previousLocation={location}
      isLoading={isLoading}
    />
  );
};

export default NavbarContainer;
