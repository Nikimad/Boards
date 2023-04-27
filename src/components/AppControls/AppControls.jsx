import PropTypes from "prop-types";
import Navbar from "../Navbar";
import Header from "../Header";

const AppControls = ({ isNavHidden, toggleNav }) => (
  <>
    <Navbar isNavHidden={isNavHidden} toggleNav={toggleNav} />
    <Header toggleNav={toggleNav} />
  </>
);

AppControls.propTypes = {
  isNavHidden: PropTypes.bool,
  toggleNav: PropTypes.func,
};

export default AppControls;
