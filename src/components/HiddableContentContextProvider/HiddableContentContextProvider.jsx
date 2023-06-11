import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import debounce from "lodash/debounce";
import { useLocation } from "react-router-dom";

const HiddableContentContextProvider = ({ children }) => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [isHidable, setIsHidable] = useState(true);

  const handleRootLocation = useCallback(() => {
    if (isHidden && location.pathname === "/") setIsHidden(false);
    if (isHidable && !isHidden && location.pathname !== "/") setIsHidden(true);
  }, [isHidable, location]);

  useEffect(() => handleRootLocation(), [handleRootLocation]);

  const handleWindowResize = useCallback(() => {
    if (!isHidable && window.innerWidth <= 800) {
      setIsHidable(true);
    }
    if (isHidable && window.innerWidth > 800) {
      setIsHidable(false);
      if (isHidden) setIsHidden(false);
    }
  }, [isHidable, isHidden]);

  const debouncedHandleWindowResize = debounce(handleWindowResize);

  useEffect(() => debouncedHandleWindowResize(), [debouncedHandleWindowResize]);

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

HiddableContentContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default HiddableContentContextProvider;
