import CurrentBoard from "./CurrentBoard";
import useModal from "../../hooks/useModal";

const CurrentBoardContainer = ({ board, toggleNav }) => {
  const { showModal, ...modalProps } = useModal();

  const handleRemove = () => {
    if (Boolean(toggleNav)) toggleNav();
  };

  return (
    <CurrentBoard
      {...{ showModal, modalProps, board }}
      onRemove={handleRemove}
    />
  );
};

export default CurrentBoardContainer;
