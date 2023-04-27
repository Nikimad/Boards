import Navbar from "../Navbar";
import Header from "../Header";
import PropTypes from "prop-types";

const AppControls = ({ isNavHidden, toggleNav }) => (
  <>
    <Navbar {...{ isNavHidden, toggleNav }} />
    <Header {...{ toggleNav }} />
  </>
);

AppControls.propTypes = {
  isNavHidden: PropTypes.bool,
  toggleNav: PropTypes.func,
};

export default AppControls;
