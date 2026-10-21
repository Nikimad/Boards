import { useContext } from "react";
import HiddableContentContext from "../../context/HiddableContentContext";
import type { Board } from "../../types";
import BoardLink from "./BoardLink";

interface BoardLinkContainerProps {
  board: Board;
}

const BoardLinkContainer = ({ board }: BoardLinkContainerProps) => {
  const { toggleIsHidden } = useContext(HiddableContentContext);

  return <BoardLink board={board} onClick={toggleIsHidden} />;
};

export default BoardLinkContainer;
