import { useDispatch } from "react-redux";

const useStateDepAction = (action) => {
  const dispatch = useDispatch();
  return (state) => dispatch(action(state));
};

export default useStateDepAction;
