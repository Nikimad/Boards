const lengthValidator = (min, max) => {
    return (key, value) => {
        if (value.length === 0) {
            return `Field: ${key} must be not empty`;
        }
        if (value.length < min) {
            return `Field: ${key} must be longer then ${min} chars`;
        }
        if (value.length > max) {
            return `Field: ${key} must be shorter then ${max} chars`;
        }
    }
};

export default lengthValidator;
