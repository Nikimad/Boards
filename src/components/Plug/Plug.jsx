import PropTypes from "prop-types";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import { ReactComponent as Err } from "../../assets/svg/err.svg";
import Loader from "../Loader";
import s from "./Plug.module.scss";

const Plug = ({ message, isLoading, isError }) => (
  <div className={s.plug}>
    {isError ? 
    <>
      <Err />
      <p>Oops something went wrong</p>
    </> :
    isLoading ? (
      <Loader />
    ) : (
      <Icon />
    )}
    <p>{message}</p>
  </div>
);

Plug.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default Plug;
