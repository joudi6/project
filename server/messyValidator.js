const allProperties = [
  "link",
  "market_date",
  "location_country",
  "location_city",
  "location_address",
  "location_coordinates_lat",
  "location_coordinates_lng",
  "size_living_area",
  "size_rooms",
  "price_value",
  "price_currency",
  "description",
  "title",
  "images",
  "sold"
];
const requiredProperties = [
  "link",
  "market_date",
  "location_country",
  "location_city",
  "size_living_area",
  "size_rooms",
  "price_value",
  "price_currency"
];

locationProperties = ["location_coordinates_lat", "location_coordinates_lng"];

validateLocation = newHouse => {
  locationProperties.forEach(prop => {
    if (typeof newHouse[prop] !== "undefined") {
      if (typeof newHouse[prop] === "number") {
        return newHouse;
      }
    }
  });
  if (newHouse.hasOwnProperty("location_address")) {
    if (
      typeof newHouse["location_address"] === "string" &&
      newHouse["location_address"].length > 0
    ) {
      return newHouse;
    }
  }
};

validator = async newHouse => {
  let valid = true;
  let errors = [];
  try {
    Object.keys(newHouse).forEach(key => {
      requiredProperties.forEach(prop => {
        if (typeof newHouse[prop] === "undefined") {
          errors.push(`${prop} is required`);
        } else {
          valid = false;
        }
      });
    });

    errors.push("missing or invalid house details");
  } catch {
    errors.push("invalid data!");
    console.log("catching prop");
  }
  return { valid, errors, raw: newHouse };
};

module.exports = { validator, allProperties };
