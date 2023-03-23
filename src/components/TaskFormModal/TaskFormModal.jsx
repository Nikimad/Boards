import Modal from "../Modal";

const TaskFormModal = ({
  state,
  onChange,
  onSubmitCapture,
  onSubmit,
  modalStatus,
  onReset,
  onClose,
}) => (
  <Modal status={modalStatus} onReset={onReset} onClose={onClose}>
    <form
      className="form"
      onSubmit={onSubmit}
      onSubmitCapture={onSubmitCapture}
    >
      <h2 className="form__title">Add New Task</h2>
      <label className="form__label">
        <span className="form__label__title">Title</span>
        <input
          name="title"
          type="text"
          className="form__input"
          onChange={onChange}
          value={state.fields.title}
        />
        {state.errors.title ? (
          <span className="form__error">{state.errors.title}</span>
        ) : null}
      </label>
      <label>
        <input className="form__submit" type="submit" value="+ Add Task" />
      </label>
    </form>
  </Modal>
);

export default TaskFormModal;
