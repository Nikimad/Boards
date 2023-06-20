import PropTypes from "prop-types";
import cn from "classnames";
import { Form as FormikForm } from "formik";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import s from "../../styles/form.module.scss";

const Form = ({ formTitle, submitTitle, isEdit, children }) => (
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
        <label className={s.form__controls__reset}>
          <input type="reset" value="Remove" />
          <Delete />
        </label>
      ) : null}
    </fieldset>
  </FormikForm>
);

Form.propTypes = {
  formTitle: PropTypes.string.isRequired,
  submitTitle: PropTypes.string.isRequired,
  isEdit: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default Form;
