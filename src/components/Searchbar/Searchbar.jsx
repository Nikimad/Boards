import PropTypes from "prop-types";
import cn from "classnames";
import sf from "../../styles/form.module.scss";
import s from "./Searchbar.module.scss";

const Searchbar = ({ value, onChange, placeholder, className }) => (
  <form className={s.searchbar}>
    <label className={cn(sf.form__label, className)}>
      <input
        className={sf.form__input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  </form>
);

Searchbar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Searchbar;
