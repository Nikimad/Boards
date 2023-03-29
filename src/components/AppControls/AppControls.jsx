import Header from "../Header";
import Navigation from "../Navigation";

const AppControls = ({ isNavHidden, toggleNav }) => (
  <>
    <Navigation {...{ isNavHidden, toggleNav }} />
    <Header {...{ toggleNav }} />
  </>
);

export default AppControls;
