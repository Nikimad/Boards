import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import s from "./LogoToggler.module.scss";

const LogoToggler = ({ onClick, isDisabled }) => (
  <button className={s.toggler} onClick={onClick} disabled={isDisabled}>
    <Logo />
  </button>
);

LogoToggler.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default LogoToggler;
