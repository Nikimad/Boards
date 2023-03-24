import { Form, Field, ErrorMessage } from "formik";

const BoardForm = ({ formTitle, children }) => (
  <Form className="form">
    <h2 className="form__tile">{formTitle}</h2>
    <label className="form__label">
      <span className="form__label__title">Title</span>
      <Field className="form__input" name="title" type="text" />
      <span className="form__error">
        <ErrorMessage name="title" />
      </span>
    </label>
    {children}
  </Form>
);

export default BoardForm;
