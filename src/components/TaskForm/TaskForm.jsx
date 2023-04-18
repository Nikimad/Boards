import "./TaskForm.scss";
import { Field, FieldArray, ErrorMessage } from "formik";
import FormWrapper from "../FormWrapper";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import { ReactComponent as Select } from "../../assets/svg/select.svg";
import getId from "../../helpers/getId";

const TaskForm = ({ values, ...props }) => (
  <FormWrapper {...props}>
    <label className="form__label">
      <span className="form__label__title">Title</span>
      <Field className="form__input" name="title" type="text" />
      <ErrorMessage name="title">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
    <label className="form__label">
      <span className="form__label__title">Description</span>
      <Field
        className="form__input form__textarea"
        name="description"
        component="textarea"
      />
      <ErrorMessage name="description">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
    <FieldArray name="subtasks">
    {({ remove, push }) => (
      <div className="subtasks">
        <span className="form__label__title">Subtasks</span>
        {values.subtasks.length > 0 &&
          values.subtasks.map((subtask, index) => (
            <div className="subtask" key={index}>
              <label className="form__label">
                <Field
                  className="form__input"
                  name={`subtasks.${index}.title`}
                  type="text"
                />
                <ErrorMessage name={`subtasks.${index}.title`}>
                  {(msg) => <span className="form__error">{msg}</span>}
                </ErrorMessage>
              </label>
              <label className="form__reset subtask__remove">
                <input type="button" onClick={() => remove(index)} />
                <Delete />
              </label>
            </div>
          ))}
        <button
          type="button"
          className="subtasks__button"
          onClick={() =>
            push({
              title: "",
              id: getId(),
            })
          }
        >
          Add Subtask
        </button>
      </div>
    )}
  </FieldArray>
    <label className="form__label form__select">
      <span className="form__label__title">Status</span>
      <Field
        className="form__input form__input_select"
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
  </FormWrapper>
);

export default TaskForm;
