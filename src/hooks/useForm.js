import { useCallback, useReducer } from "react";

const useForm = (initialState) => {
  const ACTIONS = {
    change: "CHANGE",
    reset: "RESET",
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.change:
        return { ...state, ...payload };
      case ACTIONS.reset:
        return { ...initialState };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const changeAction = useCallback(
    ({ name, value }) => ({
      type: ACTIONS.change,
      payload: { [name]: value },
    }),
    [ACTIONS.change]
  );
  const resetAction = useCallback(
    () => ({ type: ACTIONS.reset }),
    [ACTIONS.reset]
  );

  const changeFieldValue = useCallback(
    ({ target }) => dispatch(changeAction(target)),
    [changeAction]
  );

  const resetForm = useCallback(
    () => dispatch(resetAction()),
    [resetAction]
  );

  return [state, changeFieldValue, resetForm];
};

export default useForm;
