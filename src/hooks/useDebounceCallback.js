import { useCallback } from "react";
import debounce from "lodash/debounce";

const useDebouncedCallback = (calle, ms, options) =>
  useCallback(debounce(calle, ms, options), [debounce]);

export default useDebouncedCallback;
