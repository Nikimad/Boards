import { createContext } from "react";

export default createContext({
  isHidden: false,
  toggleIsHidden: () => {},
});
