import Navbar from "../Navbar";
import Header from "../Header";

const AppControls = ({ isNavHidden, toggleNav }) => (
  <>
    <Navbar {...{ isNavHidden, toggleNav }} />
    <Header {...{ toggleNav }} />
  </>
);

export default AppControls;
