const { useDispatch } = require("react-redux");

const useAction = (action) => {
  const dispatch = useDispatch();
  return () => dispatch(action);
};

export default useAction;
