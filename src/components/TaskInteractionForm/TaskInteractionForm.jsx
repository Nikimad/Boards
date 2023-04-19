import { Form, Field } from "formik";
import { ReactComponent as Select } from "../../assets/svg/select.svg";
import PropTypes from "prop-types";

const TaskInteractionForm = ({ subtasks, submitOnChange }) => (
  <Form className="form">
    {subtasks.length > 0 ? (
      <div
        className="form__label form__label_no-err"
        role="group"
        aria-labelledby="checkbox-group"
      >
        <span className="form__label__title">Subtasks</span>
        {subtasks.map((subtask, index) => (
          <label className="form__check" key={index}>
            <Field
              className="form__check__input"
              onChange={submitOnChange}
              type="checkbox"
              name="checkedSubtasks"
              value={`${subtask.id}`}
            />
            <span className="form__check__box"></span>
            {subtask.title}
          </label>
        ))}
      </div>
    ) : null}
    <label className="form__label form__select">
      <span className="form__label__title">Status</span>
      <Field
        className="form__input form__input_select"
        onChange={submitOnChange}
        name="status"
        component="select"
      >
        <option defaultValue="todo" value="todo">
          Todo
        </option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </Field>
      <Select className="form__select-appearance" />
    </label>
  </Form>
);

TaskInteractionForm.propTypes = {
  subtasks: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, title: PropTypes.string })
  ),
  submitOnChange: PropTypes.func,
};

export default TaskInteractionForm;
