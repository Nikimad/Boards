import PropTypes from "prop-types";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import Loader from "../Loader/Loader";
import s from "./Plug.module.scss";

const Plug = ({ message, isLoading }) => (
  <div className={s.plug}>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <Icon />
        <p>{message}</p>
      </>
    )}
  </div>
);

Plug.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Plug;
