import LayoutControls from "./LayoutControls";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

const LayoutControlsContainer = () => {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isNavHideable, setIsNavHideable] = useState(true);

  const handleResize = useCallback(() => {
    if (!isNavHideable && window.innerWidth <= 800) {
      setIsNavHideable(true);
    }
    if (isNavHideable && window.innerWidth > 800) {
      setIsNavHideable(false);
      if (isNavHidden) setIsNavHidden(false);
    }
  }, [isNavHideable, isNavHidden]);

  const debouncedHandleResize = debounce(handleResize, 500);

  useEffect(() => {
    debouncedHandleResize();
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  const toggleIsNavHidden = () => {
    if (isNavHideable) setIsNavHidden(!isNavHidden);
  };

  return <LayoutControls isNavHidden={isNavHidden} toggleNav={toggleIsNavHidden} />;
};

export default LayoutControlsContainer;
