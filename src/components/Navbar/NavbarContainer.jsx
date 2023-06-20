import { useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import { useSelector } from "react-redux";
import { boardsSelector } from "../../models/boards/boardsSelectors";
import getId from "../../helpers/getId";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const [searchParams] = useSearchParams();

  const { boards, length, filtredLength } = useSelector(
    boardsSelector(searchParams.get("boards") ?? "")
  );

  const { isHidden, toggleIsHidden } = useContext(HiddableContentContext);
  const location = useLocation();

  return (
    <Navbar
      isHidden={isHidden}
      toggleIsHidden={toggleIsHidden}
      query={searchParams.get("boards")}
      boards={boards}
      length={length}
      filtredLength={filtredLength}
      path={`board/${getId()}/create`}
      previousLocation={{ previousLocation: location }}
    />
  );
};

export default NavbarContainer;
