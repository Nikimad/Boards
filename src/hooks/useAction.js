import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useAction = (action) => {
  const dispatch = useDispatch();
  const dispatchAction = useCallback((state) => dispatch(action(state)), [dispatch, action]);
  return dispatchAction;
};

export default useAction;
