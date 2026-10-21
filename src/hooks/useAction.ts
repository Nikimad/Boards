import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { UnknownAction } from "@reduxjs/toolkit";

const useAction = <P, A extends UnknownAction>(action: (state: P) => A) => {
  const dispatch = useDispatch();
  const dispatchAction = useCallback(
    (state: P) => dispatch(action(state)),
    [dispatch, action]
  );
  return dispatchAction;
};

export default useAction;
