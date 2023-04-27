import { useDispatch } from "react-redux";

const useAction = (action) => {
  const dispatch = useDispatch();
  return (state) => dispatch(action(state));
};

export default useAction;
