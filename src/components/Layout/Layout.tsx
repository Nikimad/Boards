import type { ReactNode } from "react";
import s from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => <div className={s.layout}>{children}</div>;

export default Layout;
