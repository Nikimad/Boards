import Navbar from "../Navbar";
import Header from "../Header";

const LayoutControls = (props) => (
  <>
    <Navbar { ...props } />
    <Header { ...props } />
  </>
);

export default LayoutControls;
