import Modal from "../Modal";
import "./Task.scss";

const Task = ({
  title,
  id,
  showModal,
  modalStatus,
  resetModal,
  closeModal,
}) => (
  <li className="task" onDoubleClick={showModal}>
    <h3 className="task__title">{title}</h3>
    <p className="task__temp">{new Date(id).toTimeString()}</p>
    <Modal status={modalStatus} onReset={resetModal} onClose={closeModal}>
      <div className="task task__review">
        <h3 className="task__title">{title}</h3>
        <p className="task__temp">{new Date(id).toTimeString()}</p>
      </div>
    </Modal>
  </li>
);

export default Task;
