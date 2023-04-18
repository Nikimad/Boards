import { Field, ErrorMessage } from "formik";
import FormWrapper from "../FormWrapper";

const BoardForm = (props) => (
  <FormWrapper { ...props}>
    <label className="form__label">
      <span className="form__label__title">Title</span>
      <Field className="form__input" name="title" type="text" />
      <ErrorMessage name="title">
        {(msg) => <span className="form__error">{msg}</span>}
      </ErrorMessage>
    </label>
  </FormWrapper>
);

export default BoardForm;
