import { Form, Field, ErrorMessage } from "formik";
import FormControls from "../FormControls";

const TaskForm = ({ formTitle, onRemove }) => (
  <Form className="form">
    <h2 className="form__title">{formTitle}</h2>
    <label className="form__label">
      <span className="form__label__title">Title</span>
      <Field className="form__input" name="title" type="text" />
      <ErrorMessage name="title">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
    <label className="form__label">
      <span className="form__label__title">Description</span>
      <Field className="form__input form__textarea" name="description" component="textarea" />
      <ErrorMessage name="description">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
    <label className="form__label">
      <span className="form__label__title">Status</span>
      <Field className="form__input" name="status" component="select">
        <option defaultValue='todo' value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </Field>
    </label>
    <FormControls submitTitle={formTitle} onRemove={onRemove} />
  </Form>
);

export default TaskForm;
