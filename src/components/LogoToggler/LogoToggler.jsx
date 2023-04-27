import "./LogoToggler.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import PropTypes from "prop-types";

const LogoToggler = ({ onClick, isDisabled }) => (
  <button className="logo-toggler" onClick={onClick} disabled={isDisabled}>
    <Logo />
  </button>
);

LogoToggler.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default LogoToggler;
