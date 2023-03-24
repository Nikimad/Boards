import { useDispatch } from "react-redux";

const useAction = (action) => {
  const dispatch = useDispatch();
  return () => dispatch(action);
};

export default useAction;
