import type { ChangeEventHandler } from "react";
import cn from "classnames";
import sf from "../../styles/form.module.scss";
import s from "./Searchbar.module.scss";

interface SearchbarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const Searchbar = ({ value, onChange, placeholder, className }: SearchbarProps) => (
  <form className={s.searchbar}>
    <label className={cn(sf.form__label, sf.form__label_noerr, className)}>
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

export default Searchbar;
