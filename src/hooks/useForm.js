import { useCallback, useEffect, useReducer } from "react";
import getInitialState from "../helpers/getInitialFormState";
import getId from "../helpers/getId";
import validate from "../helpers/validate";
import useAction from "./useAction";

const useForm = (externalState, submitAction) => {
  const initialState = getInitialState(externalState);

  const ACTIONS = {
    change: "CHANGE",
    reset: "RESET",
    validate: "VALIDATE",
  };

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.change:
        return { ...state, fields: { ...state.fields, ...payload } };
      case ACTIONS.reset:
        return { ...initialState };
      case ACTIONS.validate:
        return { ...state, ...validate(state.fields, state.validators) };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const changeAction = useCallback(({ name, value }) => ({
    type: ACTIONS.change,
    payload: { [name]: value },
  }), [ACTIONS.change]);

  const resetAction = useCallback(() => ({ type: ACTIONS.reset }), [ACTIONS.reset]);
  const validateAction = useCallback(() => ({ type: ACTIONS.validate }), [ACTIONS.validate]);

  const resetForm = useCallback(() => dispatch(resetAction()), [resetAction]);
  const validateForm = useCallback(() => dispatch(validateAction()), [validateAction]);

  const dispatchSubmitAction = useAction(
    submitAction({
      id: getId(),
      ...state.fields,
    })
  );

  useEffect(() => {
    if (state.isValid) {
      dispatchSubmitAction();
      resetForm();
    }
  }, [state.isValid, dispatchSubmitAction, resetForm]);


  const change = useCallback(
    ({ target }) => dispatch(changeAction(target)),
    [changeAction]
  );
  
  const submit = useCallback(
    (e) => {
      e.preventDefault();
      validateForm();
    },
    [validateForm]
  );

  return [state, change, submit];
};

export default useForm;
