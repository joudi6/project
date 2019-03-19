const requiredProperties = [
  "link",
  "location_country",
  "location_city",
  "size_living_area",
  "size_rooms",
  "price_value",
  "price_currency"
];
let validLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

locationProperties = ["location_coordinates_lat", "location_coordinates_lng"];

function validator(newHouse) {
  let errors = [];
  let valid = false;

  function checkLocation(newHouse) {
    if (!newHouse.hasOwnProperty("location_address")) {
      if (
        !(
          newHouse.hasOwnProperty("location_coordinates_lat") &&
          newHouse.hasOwnProperty("location_coordinates_lng")
        )
      ) {
        errors.push(
          `location information must exist please enter location_address or both "location_coordinates_lat" and "location_coordinates_lng" `
        );
      }
    }
  }
  function checkRequiredProps(newHouse, requiredProperties) {
    for (let i = 0; i < requiredProperties.length; i++) {
      if (!newHouse.hasOwnProperty(requiredProperties[i])) {
        errors.push(`${requiredProperties[i]} is required`);
      }
    }
  }
  function checkObject(house) {
    if (typeof house !== "object" || Object.keys(house).length === 0) {
      errors.push(`invalid data. each house must be valid json object`);
    }
  }
  function checkDate(house) {
    if (!newHouse.hasOwnProperty("market_date")) {
      house["market_date"] = new Date().toISOString().slice(0, 10);
    }
  }
  checkObject(newHouse);
  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      raw: null
    };
  }

  checkRequiredProps(newHouse, requiredProperties);
  checkLocation(newHouse);
  checkDate(newHouse);
  Object.entries(newHouse).forEach(([key, value]) => {
    switch (key) {
      case "link":
        !validLink.test(value) && errors.push(`${key} must be working url`);
        break;
      case "market_date":
        {
          const now = new Date().toISOString().slice(0, 10);
          const year = now.getYear();
          const month = now.getMonth();
          const day = now.getDay();
          let today = `${year}-${month}-${day}`;
          let validDate = /^ (19 | 20) \d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
          if (value > today) {
            errors.push(`${key} must be valid date in the past`);
          }
        }
        break;
      case "location_country":
      case "location_city":
      case "location_address":
        if (typeof value !== "string" || !value.length)
          errors.push(`${key} must be text`);
        break;
      case "location_coordinates_lat":
      case "location_coordinates_lng":
      case "price_value":
      case "size_living_area":
        if (!Number.isFinite(value)) {
          errors.push(`${key} must be a float number`);
        }
        break;
      case "size_rooms":
        if (!Number.isInteger(value)) {
          errors.push(`${key} must be a whole number`);
        }
        break;
      case "price_currency":
        {
          const currencies = [
            "USD",
            "EUR",
            "JPY",
            "GBP",
            "CHF",
            "CAD",
            "AUD",
            "HKD"
          ];
          let insertedCur = value.toUpperCase();
          !currencies.includes(insertedCur) &&
            errors.push(`${key} must be three letters of existence currency`);
        }
        break;
      case "images":
        {
          let imagesArray = value.split(",");
          imagesArray.map(imageURL => {
            !validLink.test(imageURL) &&
              errors.push(
                `${key} must be list of urls to images, separated with comma`
              );
          });
        }
        break;
      case "sold":
        if (typeof value !== "number" || (value !== 0 && value !== 1))
          errors.push(`${key} must be 0 or 1`);
        break;
    }
  });

  if (!errors.length) valid = true;

  return {
    valid,
    errors,
    raw: newHouse
  };
}

module.exports = { validator };

// function isDate(dateAndTime) {
//   const D = new Date(Date.parse(dateAndTime));
//   const date = [D.getFullYear(), D.getMonth(), D.getDate()];
//   let month = date[1] < 10 ? "0" + date[1] : date[1];
//   let day = date[2] < 10 ? "0" + date[2] : date[2];
//   return isNaN(day)
//     ? new Date().toISOString().slice(0, 10)
//     : `${date[0]}-${month}-${day}`;
// }
