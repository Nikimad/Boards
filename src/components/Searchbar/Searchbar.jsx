import PropTypes from "prop-types";
import sf from "../../styles/form.module.scss";
import s from "./Searchbar.module.scss";

const Searchbar = ({ value, onChange }) => (
  <form className={s.searchbar}>
    <label className={sf.form__label}>
      <input
        className={sf.form__input}
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
