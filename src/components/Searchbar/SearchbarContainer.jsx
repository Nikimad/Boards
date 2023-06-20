import { useSearchParams } from "react-router-dom";
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

export default SearchbarContainer;
