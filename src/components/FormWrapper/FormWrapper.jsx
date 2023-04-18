import "./FormWrapper.scss";
import { Form } from "formik";
import { ReactComponent as Delete } from "../../assets/svg/delete.svg";

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

export default FormWrapper;
