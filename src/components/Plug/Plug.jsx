import PropTypes from "prop-types";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import s from "./Plug.module.scss";

const Plug = ({ message }) => (
  <div className={s.plug}>
    <Icon />
    <p>{message}</p>
  </div>
);

Plug.propTypes = {
  message: PropTypes.string,
};

export default Plug;
