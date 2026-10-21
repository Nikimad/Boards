import { useCallback } from "react";
import debounce from "lodash/debounce";
import type { DebounceSettings } from "lodash";

const useDebouncedCallback = <T extends (...args: never[]) => unknown>(
  calle: T,
  ms?: number,
  options?: DebounceSettings
) =>
  useCallback(debounce(calle, ms, options), [debounce]);

export default useDebouncedCallback;
