import PropTypes from "prop-types";
import s from "./Layout.module.scss";

const Layout = ({ children }) => <div className={s.layout}>{children}</div>;

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Layout;
