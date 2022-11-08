const objectId = (value, helpers) => {
  if (!value.match(/\d+/)) {
    return helpers.message('"{{#label}}" must be a digit string');
  }
  return value;
};

module.exports = {
  objectId,
};
