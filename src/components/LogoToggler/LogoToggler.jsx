import "./LogoToggler.scss";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const LogoToggler = ({ onClick, isDisabled }) => (
  <button className="logo-toggler" onClick={onClick} disabled={isDisabled}>
    <Logo />
  </button>
);

export default LogoToggler;
