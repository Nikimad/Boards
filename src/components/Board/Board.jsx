import "./Board.scss";
import { ReactComponent as Icon } from "../../assets/svg/doc.svg";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import Modal from "../Modal";
import BoardForm from "../BoardForm";

const Board = ({
  boardValues,
  isCurrent,
  onClick,
  showModal,
  modalProps,
  onSubmit,
  onRemove,
}) => (
  <a
    className="board"
    href={`/${boardValues.title}`}
    onClick={onClick}
    data-current={isCurrent}
  >
    <Icon width={"1.5em"} />
    <span>{boardValues.title}</span>
    <Edit width={"1.5em"} onClick={showModal} />

    <Modal {...modalProps}>
      <BoardForm
        formTitle="Edit Board"
        initialValues={boardValues}
        onSubmit={onSubmit}
      >
        <fieldset>
          <label>
            <input className="form__submit" type="submit" value="Save" />
          </label>
          <label>
            <input className="form__submit" type="button" value="Remove" onClick={onRemove} />
          </label>
        </fieldset>
      </BoardForm>
    </Modal>
  </a>
);

export default Board;
