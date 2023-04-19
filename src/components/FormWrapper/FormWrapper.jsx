import "./FormWrapper.scss";
import { Form } from "formik";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";
import PropTypes from 'prop-types';

const FormWrapper = ({ formTitle, submitTitle, isEdit, children }) => (
  <Form className="form">
    <h2 className="form__title">{formTitle}</h2>
    {children}
    <fieldset className="form__controls">
      <label>
        <input
          type="submit"
          className="form__submit"
          value={isEdit ? "Edit" : submitTitle}
        />
      </label>
      {isEdit ? (
        <label className="form__reset">
          <input type="reset" value="Remove" />
          <Delete />
        </label>
      ) : null}
    </fieldset>
  </Form>
);

FormWrapper.propTypes = {
  formTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  isEdit: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

export default FormWrapper;
