import { useSearchParams } from "react-router-dom";
import Searchbar from "./Searchbar";

const SearchbarContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const handleChange = ({ target }) => setSearchParams({ search: target.value});

  return (
    <Searchbar value={searchParams.get("search") ?? ""} onChange={handleChange} />
  );
};

export default SearchbarContainer;
