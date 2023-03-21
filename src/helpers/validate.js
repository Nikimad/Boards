const validate = (state) => {
  const errors = Object.entries(state.validators).reduce(
    (acc, [fieldName, validators]) => {
      let message;

      for (let i = 0; i < validators.length; i += 1) {
        const validator = validators[i];

        message = validator(fieldName, state.fields[fieldName]) ?? null;

        if (Boolean(message)) break;
      }

      acc[fieldName] = message;

      return acc;
    },
    {}
  );

  const isValid =
    Object.values(errors).filter((error) => error !== null).length === 0;

  return { errors, isValid };
};

export default validate;
