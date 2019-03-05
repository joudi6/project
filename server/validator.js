validator = async newHouse => {
  let valid = true;
  let errors = [];
  if (!checkJson(newHouse)) {
    return errors;
  } else {
  }
};

module.exports = { validator };
