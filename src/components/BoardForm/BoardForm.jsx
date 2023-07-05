import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import Form from "../Form";
import s from "../../styles/form.module.scss";

const BoardForm = ({ isEdit, onRemove }) => (
  <Form
    formTitle={isEdit ? "Edit board" : "Create new board"}
    submitTitle={isEdit ? "Edit" : "Create board"}
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
  </Form>
);

BoardForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default BoardForm;
