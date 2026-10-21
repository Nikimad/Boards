import { useSearchParams } from "react-router";
import type { ChangeEvent } from "react";
import Searchbar from "./Searchbar";

interface SearchbarContainerProps {
  param: string;
  placeholder?: string;
  className?: string;
}

const SearchbarContainer = ({ param, placeholder, className }: SearchbarContainerProps) => {
  const [searchParams, setSearchParams] = useSearchParams({ [param]: "" });
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
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
