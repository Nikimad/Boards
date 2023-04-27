import PropTypes from "prop-types";
import s from "./Wrapper.module.scss";

const Wrapper = ({ children }) => <div className={s.wrapper}>{children}</div>;

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Wrapper;
