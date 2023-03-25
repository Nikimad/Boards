import Sidebar from "./Sidebar";
import { useState, useCallback, useEffect } from "react";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectBoardsCount } from "../../models/boards/boardsSelectors";
import useStateDepAction from "../../hooks/useStateDepAction";
import { addBoard } from "../../models/boards/boardsSlice";
import getId from "../../helpers/getId";
import debounce from "lodash/debounce";

const SidebarContainer = () => {
  const { showModal, ...modalProps} = useModal();
  const dispatchStateDepAddBoard = useStateDepAction(addBoard);
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

  const debouncedHandleResize = debounce(handleResize, 500);

  useEffect(() => {
    debouncedHandleResize();
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  const toggleIsHidden = () => {
    if (isHideable) setIsHidden(!isHidden);
  };

  const handleAddBoard = (values) => {
    dispatchStateDepAddBoard({
      id: getId(),
      ...values,
    });
    modalProps.resetModal();
  };

  return (
    <Sidebar
      boardsCount={boardsCount}
      onClick={toggleIsHidden}
      isHidden={isHidden}
      showModal={showModal}
      modalProps={modalProps}
      onSubmit={handleAddBoard}
    />
  );
};

export default SidebarContainer;
