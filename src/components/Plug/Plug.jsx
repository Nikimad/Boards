import PropTypes from "prop-types";
// TODO(svg-migration): вернуть оригинальный SVG (doc.svg)
import Icon from "../SvgPlaceholder";
// TODO(svg-migration): вернуть оригинальный SVG (err.svg)
import Err from "../SvgPlaceholder";
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
