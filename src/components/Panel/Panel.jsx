import PropTypes from "prop-types";
import s from "./Panel.module.scss";

const Panel = ({children}) => (
  <div className={s.panel}>
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.element,
};

export default Panel;
