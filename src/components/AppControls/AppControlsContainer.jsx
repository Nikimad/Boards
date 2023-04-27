import AppContols from "./AppControls";
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

const AppContorlsContainer = () => {
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


  return <AppContols isNavHidden={isNavHidden} toggleNav={toggleIsNavHidden} />;
};

export default AppContorlsContainer;
