const requiredProps = ["owner", "rooms", "price"];

const validator = newHouseData => {
  let valid = true;
  let errors = [];

  if (!newHouseData.constructor === Object) {
    valid = false;
    errors.push("house should be an object");
  } else {
    requiredProps.forEach(prop => {
      if (typeof newHouseData[prop] === "undefined") {
        valid = false;
        errors.push(`${prop} is required`);
      } else {
        Object.keys(newHouseData).forEach(key => {
          if (key === "price") {
            let price = newHouseData[key];
            let range = /^[0-9]+$/;
            if (typeof price !== "number" || !range.test(price) || price < 0) {
              valid = false;
              errors.push("price should be a positive number");
            }
          }
        });
      }
    });
  }
  return {
    valid,
    errors,
    raw: newHouseData
  };
};

// const newHousesValues = newHouseData => {
//   return ["owner", "rooms", "price"].map(prop => newHouseData[prop]);
// };

module.exports = {
  validator
  // , newHousesValues
};
