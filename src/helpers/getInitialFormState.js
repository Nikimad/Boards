const getInitialState = ({ fields, validators }) => {
  const fieldsNames = Object.keys(fields);

  const isValid = false;
  const errors = fieldsNames.reduce((acc, fieldName) => {
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
