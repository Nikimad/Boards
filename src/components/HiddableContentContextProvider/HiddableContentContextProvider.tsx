import { useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import HiddableContentContext from "../../context/HiddableContentContext";
import debounce from "lodash/debounce";

interface HiddableContentContextProviderProps {
  children: ReactNode;
}

const HiddableContentContextProvider = ({ children }: HiddableContentContextProviderProps) => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [isHidable, setIsHidable] = useState(false);

  const handleRootLocation = useCallback(() => {
    if (isHidden && location.pathname === "/") setIsHidden(false);
    if (
      isHidable &&
      !isHidden &&
      location.pathname !== "/" &&
      !location.pathname.includes("create")
    )
      setIsHidden(true);
  }, [isHidden, isHidable, location]);

  const handleWindowResize = useCallback(() => {
    if (!isHidable && window.innerWidth <= 800) {
      setIsHidable(true);
    }
    if (isHidable && window.innerWidth > 800) {
      setIsHidable(false);
      if (isHidden) setIsHidden(false);
    }
  }, [location, isHidable, isHidden]);

  const debouncedHandleWindowResize = debounce(handleWindowResize);

  useEffect(() => debouncedHandleWindowResize(), [debouncedHandleWindowResize]);

  useEffect(() => handleRootLocation(), [handleRootLocation]);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleWindowResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleWindowResize);
    };
  }, [debouncedHandleWindowResize]);

  const toggleIsHidden = useCallback(() => {
    if (isHidable) setIsHidden(!isHidden);
  }, [isHidable, isHidden]);

  return (
    <HiddableContentContext.Provider value={{ isHidden, toggleIsHidden }}>
      {children}
    </HiddableContentContext.Provider>
  );
};

export default HiddableContentContextProvider;
