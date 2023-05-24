import PropTypes from "prop-types";
import s from "../../styles/form.module.scss";

const Searchbar = ({ value, onChange }) => (
  <form>
    <label className={s.form__label}>
      <input
        className={s.form__input}
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </label>
  </form>
);

Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Searchbar;
