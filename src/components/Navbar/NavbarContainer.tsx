import { useContext } from "react";
import { useLocation } from "react-router";
import HiddableContentContext from "../../context/HiddableContentContext";
import type { Board } from "../../types";
import Navbar from "./Navbar";

interface NavbarContainerProps {
  boards: Board[];
  searchParams: string | null;
  isLoading: boolean;
}

const NavbarContainer = ({ boards, searchParams, isLoading }: NavbarContainerProps) => {
  const { isHidden } = useContext(HiddableContentContext);
  const location = useLocation();

  return (
    <Navbar
      isHidden={isHidden}
      boards={boards}
      searchParams={searchParams}
      previousLocation={{ previousLocation: location }}
      isLoading={isLoading}
    />
  );
};

export default NavbarContainer;
