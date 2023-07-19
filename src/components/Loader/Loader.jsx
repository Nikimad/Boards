import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as LoaderIcon } from "../../assets/svg/loading.svg";
import s from "./Loader.module.scss";

const Loader = ({ className }) => <LoaderIcon className={cn(s.loader, className)} />

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
