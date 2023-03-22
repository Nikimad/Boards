import Modal from "../Modal";

const BoardForm = ({
  modalStatus,
  onReset,
  onClose,
  state,
  onChange,
  onSubmit,
}) => (
  <Modal status={modalStatus} onReset={onReset} onClose={onClose}>
    <form className="form" onSubmit={onSubmit}>
      <h2 className="form__title">Create New Board</h2>
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
        <input
          className="form__submit"
          type="submit"
          value="+ Create New Board"
        />
      </label>
    </form>
  </Modal>
);

export default BoardForm;
