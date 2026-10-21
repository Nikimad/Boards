import Icon from "../../assets/svg/doc.svg?react";
import Err from "../../assets/svg/err.svg?react";
import Loader from "../Loader";
import s from "./Plug.module.scss";

interface PlugProps {
  message?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const Plug = ({ message, isLoading, isError }: PlugProps) => (
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

export default Plug;
