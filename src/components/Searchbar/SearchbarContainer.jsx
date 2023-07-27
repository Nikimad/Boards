import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Searchbar from "./Searchbar";

const SearchbarContainer = ({ param, placeholder, className }) => {
  const [searchParams, setSearchParams] = useSearchParams({ [param]: "" });
  const handleChange = ({ target }) =>
    setSearchParams({ [param]: target.value });

  return (
    <Searchbar
      value={searchParams.get(param) ?? ""}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

Searchbar.propTypes = {
  param: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchbarContainer;
