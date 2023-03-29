import "./AddTask.scss";
import Modal from "../Modal";
import TaskForm from "../TaskForm";

const AddTask = ({ showModal, modalProps, onSubmit }) => (
  <>
    <button className="add-task" onClick={showModal}>
      +<span className="add-task__text"> Add New Task</span>
    </button>
    <Modal {...modalProps}>
      <TaskForm formTitle="Add Task" onSubmit={onSubmit} />
    </Modal>
  </>
);

export default AddTask;
