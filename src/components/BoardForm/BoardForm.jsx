import { Form, Field, ErrorMessage } from "formik";
import FormControls from "../FormControls/FormControls";

const BoardForm = ({ formTitle, onRemove }) => (
  <Form className="form">
    <h2 className="form__title">{formTitle}</h2>
    <label className="form__label">
      <span className="form__label__title">Title</span>
      <Field className="form__input" name="title" type="text" />
      <ErrorMessage name="title">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
    <FormControls submitTitle={formTitle} onRemove={onRemove} />
  </Form>
);

export default BoardForm;
