const requiredValidator = () => {
  return (key, value) => {
    if (value.length === 0) {
      return `Field: ${key} is required`;
    }
  };
};

export default requiredValidator;
