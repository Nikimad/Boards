import type { ReactNode } from "react";
import cn from "classnames";
import { Form as FormikForm } from "formik";
import Delete from "../../assets/svg/delete.svg?react";
import s from "../../styles/form.module.scss";

interface FormProps {
  formTitle: string;
  submitTitle: string;
  isEdit?: boolean;
  onRemove?: () => void;
  children?: ReactNode;
}

const Form = ({ formTitle, submitTitle, isEdit, onRemove, children }: FormProps) => (
  <FormikForm className={s.form}>
    <h2>{formTitle}</h2>
    {children}
    <fieldset className={cn(s.form__fieldset, s.form__controls)}>
      <label>
        <input
          type="submit"
          className={s.form__controls__submit}
          value={isEdit ? "Edit" : submitTitle}
        />
      </label>
      {isEdit ? (
        <label className={s.form__controls__remove}>
          <input type="button" value="Remove" onClick={onRemove} />
          <Delete />
        </label>
      ) : null}
    </fieldset>
  </FormikForm>
);

export default Form;
