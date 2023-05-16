import PropTypes from "prop-types";
import LayoutControls from "../LayoutControls";
import s from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={s.layout}>
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
