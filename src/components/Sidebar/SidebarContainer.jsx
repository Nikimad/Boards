import Sidebar from "./Sidebar";
import { useState, useCallback, useEffect } from "react";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectBoardsCount } from "../../models/boards/boardsSelectors";

const SidebarContainer = () => {
  const modalProps = useModal();
  const [isHidden, setIsHidden] = useState(false);
  const [isHideable, setIsHideable] = useState(true);
  const boardsCount = useSelector(selectBoardsCount);

  const handleResize = useCallback(() => {
    if (!isHideable && window.innerWidth <= 800) {
      setIsHideable(true);
    }
    if (isHideable && window.innerWidth > 800) {
      setIsHideable(false);
      if (isHidden) setIsHidden(false);
    }
  }, [isHideable, isHidden]);

  useEffect(handleResize, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const toggleIsHidden = () => {
    if (isHideable) setIsHidden(!isHidden);
  };

  return (
    <Sidebar
      boardsCount={boardsCount}
      onClick={toggleIsHidden}
      isHidden={isHidden}
      modalProps={modalProps}
    />
  );
};

export default SidebarContainer;
