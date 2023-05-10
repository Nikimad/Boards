import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import { layout__toggler } from "./LayoutToggler.module.scss";

const LogoToggler = ({ onClick, ...props }) => (
  <button className={layout__toggler} onClick={onClick} {...props}>
    <Logo />
  </button>
);

LogoToggler.propTypes = {
  onClick: PropTypes.func,
};

export default LogoToggler;
