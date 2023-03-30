import Modal from "../Modal";
import "./Task.scss";
import { ReactComponent as Edit } from "../../assets/svg/edit.svg";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
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
  <li className="task task__preview" onDoubleClick={showModal}>
    <h3 className="task__title">{taskValues.title}</h3>
    <Modal {...modalProps}>
      {isEdit ? (
        <TaskForm
          formTitle="Edit Task"
          initialValues={taskValues}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
      ) : (
        <div className="task task__review">
          <h3 className="task__title">{taskValues.title}</h3>
          <div className="task__description">
            <p><span className="task__description__heading">Status:</span> <span className="task__description__status">{taskValues.status}</span></p>
            { taskValues.description.length > 0 ? <p className="task__description__main"><span className="task__description__heading">Description</span> {taskValues.description}</p> : null }
          </div>
          <div className="task__controls">
            <Edit onClick={onEdit} />
            <Delete onClick={onRemove} />
          </div>
        </div>
      )}
    </Modal>
  </li>
);

export default Task;
