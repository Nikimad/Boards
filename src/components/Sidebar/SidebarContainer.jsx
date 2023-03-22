import Sidebar from "./Sidebar";
import { useState, useCallback, useEffect } from "react";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectBoardsCount } from "../../models/boards/boardsSelectors";

const SidebarContainer = () => {
  const modalProps = useModal();
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const boardsCount = useSelector(selectBoardsCount);

  const handleResize = useCallback(() => {
    if (!isMobile && window.innerWidth <= 800) {
      setIsMobile(true);
    }
    if (isMobile && window.innerWidth > 800) {
      setIsMobile(false);
      if (isHidden) setIsHidden(false);
    }
  }, [isMobile, isHidden]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const toggleIsHidden = () => {
    if (isMobile) setIsHidden(!isHidden);
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
