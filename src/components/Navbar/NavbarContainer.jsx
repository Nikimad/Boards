import { useContext } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import HiddableContentContext from "../../context/HiddableContentContext";
import Navbar from "./Navbar";

const NavbarContainer = ({ boards, searchParams, isLoading }) => {
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

NavbarContainer.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      createdAt: PropTypes.number,
    })
  ),
  searchParams: PropTypes.oneOfType([PropTypes.shape(null), PropTypes.string]),
  isLoading: PropTypes.bool,
};

export default NavbarContainer;
