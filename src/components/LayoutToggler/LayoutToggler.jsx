import PropTypes from "prop-types";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const LogoToggler = ({ onClick, ...props }) => (
  <button onClick={onClick} {...props}>
    <Logo />
  </button>
);

LogoToggler.propTypes = {
  onClick: PropTypes.func,
};

export default LogoToggler;
