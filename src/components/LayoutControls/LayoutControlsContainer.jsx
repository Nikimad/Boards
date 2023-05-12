import LayoutControls from "./LayoutControls";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

const LayoutControlsContainer = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [isNavbarHideable, setIsNavbarHideable] = useState(true);

  const handleWindowResize = useCallback(() => {
    if (!isNavbarHideable && window.innerWidth <= 800) {
      setIsNavbarHideable(true);
    }
    if (isNavbarHideable && window.innerWidth > 800) {
      setIsNavbarHideable(false);
      if (isNavbarHidden) setIsNavbarHidden(false);
    }
  }, [isNavbarHideable, isNavbarHidden]);

  const debouncedHandleWindowResize = debounce(handleWindowResize, 500);

  useEffect(() => {
    debouncedHandleWindowResize();
    window.addEventListener("resize", debouncedHandleWindowResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleWindowResize);
    };
  }, [debouncedHandleWindowResize]);

  const toggleIsNavbarHidden = () => {
    if (isNavbarHideable) setIsNavbarHidden(!isNavbarHidden);
  };

  return (
    <LayoutControls
      isNavbarHidden={isNavbarHidden}
      toggleNavbar={toggleIsNavbarHidden}
    />
  );
};

export default LayoutControlsContainer;
