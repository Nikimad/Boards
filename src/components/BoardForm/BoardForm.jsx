import { Field, ErrorMessage } from "formik";
import FormWrapper from "../FormWrapper";
import s from "../../styles/form.module.scss";

const BoardForm = (props) => (
  <FormWrapper {...props}>
    <label className={s.form__label}>
      <span className={s.form__label__title}>Title</span>
      <Field className={s.form__input} name="title" type="text" />
      <ErrorMessage
        name="title"
        component="span"
        className={s.form__label__error}
      />
    </label>
  </FormWrapper>
);

export default BoardForm;
