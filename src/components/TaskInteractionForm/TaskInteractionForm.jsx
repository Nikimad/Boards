import PropTypes from "prop-types";
import cn from "classnames";
import { Form, Field } from "formik";
import { ReactComponent as Select } from "../../assets/svg/select.svg";
import s from "../../styles/form.module.scss";

const TaskInteractionForm = ({ subtasks, submitOnChange }) => (
  <Form className={s.form}>
    {subtasks.length > 0 ? (
      <div
        className={cn(s.form__label, s.form__label_noerr)}
        role="group"
        aria-labelledby="checkbox-group"
      >
        <span className={s.form__label__title}>Subtasks</span>
        {subtasks.map((subtask, index) => (
          <label className={s.form__check} key={index}>
            <Field
              className={s.form__check__input}
              onChange={submitOnChange}
              type="checkbox"
              name="checkedSubtasks"
              value={`${subtask.id}`}
            />
            <span className={s.form__check__box}></span>
            {subtask.title}
          </label>
        ))}
      </div>
    ) : null}
    <label className={cn(s.form__label, s.form__label_noerr)}>
      <span className={s.form__label__title}>Status</span>
      <Field
        className={cn(s.form__input, s.form__select)}
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
      <Select className={s.form__select__appearance} />
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
