import { ReactComponent as Delete } from "../../assets/svg/delete.svg";

const FormControls = ({ submitTitle, onRemove }) => (
  <fieldset className="form__controls">
    <label>
      <input
        className="form__submit"
        type="submit"
        value={Boolean(onRemove) ? "Edit" : submitTitle}
      />
    </label>
    {Boolean(onRemove) ? (
      <label className="form__remove">
        <input
          type="button"
          onClick={onRemove}
          value="Remove"
        />
        <Delete />
      </label>
    ) : null}
  </fieldset>
);

export default FormControls;
