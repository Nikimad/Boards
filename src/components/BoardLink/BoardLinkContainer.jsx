import { useContext } from "react";
import PropTypes from "prop-types";
import HiddableContentContext from "../../context/HiddableContentContext";
import BoardLink from "./BoardLink";

const BoardLinkContainer = ({ board }) => {
  const { toggleIsHidden } = useContext(HiddableContentContext);

  return <BoardLink board={board} onClick={toggleIsHidden} />;
};

BoardLinkContainer.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default BoardLinkContainer;
