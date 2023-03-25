import Modal from "../Modal";
import "./Task.scss";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import TaskForm from "../TaskForm";

const Task = ({
  taskValues,
  showModal,
  modalProps,
  isEdit,
  onEdit,
  onSubmit,
  onRemove,
}) => (
  <li className="task" onDoubleClick={showModal}>
    <h3 className="task__title">{taskValues.title}</h3>
    <Modal {...modalProps}>
      {isEdit ? (
        <TaskForm
          formTitle="Edit Task"
          initialValues={taskValues}
          onSubmit={onSubmit}
        >
          <fieldset>
            <label>
              <input className="form__submit" type="submit" value="Save" />
            </label>
            <label>
              <input
                className="form__submit"
                type="button"
                value="Remove"
                onClick={onRemove}
              />
            </label>
          </fieldset>
        </TaskForm>
      ) : (
        <div className="task task__review">
          <h3 className="task__title">{taskValues.title}</h3>
          <Edit onClick={onEdit} width={"2em"} />
          <button onClick={onRemove}>Remove</button>
        </div>
      )}
    </Modal>
  </li>
);

export default Task;
