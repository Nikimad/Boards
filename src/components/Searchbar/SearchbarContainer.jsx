import { useState } from "react";
import useAction from "../../hooks/useAction";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import { setFilter } from "../../models/view/viewSlice";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";
import { filterSelector } from "../../models/view/viewSelectors";

const SearchbarContainer = () => {
  const filter = useSelector(filterSelector);
  const [query, setQuery] = useState(filter);

  const dispatchSetFilter = useAction(setFilter);
  const debounceDispatchSetFilter = useDebounceCallback(dispatchSetFilter, 300);

  const handleChangeQuery = ({ target }) => {
    const { value } = target;

    setQuery(value);
    debounceDispatchSetFilter(value);
  };

  return <Searchbar value={query} onChange={handleChangeQuery} />;
};

export default SearchbarContainer;
