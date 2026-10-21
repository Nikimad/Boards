import { Field, ErrorMessage } from "formik";
import Form from "../Form";
import s from "../../styles/form.module.scss";

interface BoardFormProps {
  isEdit: boolean;
  onRemove: () => void;
}

const BoardForm = ({ isEdit, onRemove }: BoardFormProps) => (
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

export default BoardForm;
