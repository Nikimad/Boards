import cn from "classnames";
import LoaderIcon from "../../assets/svg/loader.svg?react";
import s from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => <LoaderIcon className={cn(s.loader, className)} />

export default Loader;
