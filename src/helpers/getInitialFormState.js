const getInitialState = ({ fields, validators }) => {
  const validationFieldsNames = Object.keys(validators);

  const isValid = false;
  const errors = validationFieldsNames.reduce((acc, fieldName) => {
    acc[fieldName] = null;
    return acc;
  }, {});

  return {
    isValid,
    fields,
    validators,
    errors,
  };
};

export default getInitialState;
