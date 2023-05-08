import PropTypes from "prop-types";
import LayoutControls from "../LayoutControls";
import { layout } from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={layout}>
    <LayoutControls />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Layout;
