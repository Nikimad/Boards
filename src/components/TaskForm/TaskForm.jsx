import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Select } from "../../assets/svg/select.svg";
import { Field, FieldArray, ErrorMessage } from "formik";
import Form from "../Form";
import s from "../../styles/form.module.scss";

const TaskForm = ({ values, isEdit, onRemove }) => (
  <Form
    formTitle={isEdit ? "Edit task" : "Add new task"}
    submitTitle={isEdit ? "Edit" : "Create task"}
    isEdit={isEdit}
    onRemove={onRemove}
  >
    <label className={s.form__label}>
      <span className={s.form__label__title}>Title</span>
      <Field className={s.form__input} name="title" type="text" />
      <ErrorMessage
        name="title"
        component="span"
        className={s.form__label__error}
      />
    </label>
    <label className={s.form__label}>
      <span className={s.form__label__title}>Description</span>
      <Field
        className={cn(s.form__input, s.form__textarea)}
        name="description"
        component="textarea"
      />
      <ErrorMessage
        name="description"
        component="span"
        className={s.form__label__error}
      />
    </label>
    <FieldArray name="subtasks">
      {({ remove, push }) => (
        <fieldset className={cn(s.form__fieldset, s.form__label)}>
          <span className={s.form__label__title}>Subtasks</span>
          {values.subtasks.length > 0 &&
            values.subtasks.map((_, index) => (
              <div className={s.form__optionalfield} key={index}>
                <label className={s.form__label}>
                  <Field
                    className={s.form__input}
                    name={`subtasks.${index}.title`}
                    type="text"
                  />
                  <ErrorMessage
                    name={`subtasks.${index}.title`}
                    component="span"
                    className={s.form__label__error}
                  />
                </label>
                <label className={cn(s.form__label, s.form__controls__remove)}>
                  <input type="button" onClick={() => remove(index)} />
                  <Delete />
                </label>
              </div>
            ))}
          <button
            type="button"
            className={s.form__controls__submit}
            onClick={() =>
              push({
                title: "",
                id: Date.now(),
              })
            }
          >
            Add Subtask
          </button>
        </fieldset>
      )}
    </FieldArray>
    <label className={cn(s.form__label, s.form__label_noerr)}>
      <span className={s.form__label__title}>Status</span>
      <Field
        className={cn(s.form__input, s.form__select)}
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

TaskForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    boardId: PropTypes.number,
    subtasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
  }),
  isEdit: PropTypes.bool,
  onRemove: PropTypes.bool,
};

export default TaskForm;
