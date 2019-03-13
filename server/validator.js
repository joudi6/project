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
let validLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

locationProperties = ["location_coordinates_lat", "location_coordinates_lng"];

function validator(newHouse) {
  let errors = [];
  let valid = false;

  function checkLocation(newHouse) {
    if (!newHouse.hasOwnProperty("location_address")) {
      if (
        !newHouse.hasOwnProperty(
          "location_coordinates_lat" && "location_coordinates_lat"
        )
      ) {
        errors.push(
          `location information must exist please enter location_address or both "location_coordinates_lat" and "location_coordinates_lat" `
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
    typeof house !== "object" || !Object.entries(house).length > 0
      ? errors.push(`invalid data. each house must be valid json object`)
      : errors;
  }

  checkObject(newHouse);
  checkRequiredProps(newHouse, requiredProperties);
  checkLocation(newHouse);
  !errors.length &&
    Object.keys(newHouse).forEach(key => {
      switch (key) {
        case "link": {
          !validLink.test(newHouse[key]) &&
            errors.push(`${key} must be working url`);

          break;
        }
        case "market_date":
          {
            var rightNow = new Date();
            newHouse[key] = rightNow.toISOString().slice(0, 10);
          }
          break;
        case "location_country":
        case "location_city":
        case "location_address":
          {
            if (typeof newHouse[key] !== "string" || !newHouse[key].length)
              errors.push(`${key} must be text`);
          }
          break;

        case "location_coordinates_lat":
        case "location_coordinates_lng":
        case "price_value":
          {
            if (typeof newHouse[key] !== "number" || newHouse[key] % 1 === 0)
              errors.push(`${key} must be a float number`);
          }
          break;
        case "size_living_area":
          {
            if (
              typeof newHouse[key] !== "number" ||
              (newHouse[key] > 0 && Math.sqrt(newHouse[key]) % 1 !== 0)
            )
              errors.push(`${key} must be in square meters`);
          }
          break;
        case "size_rooms":
          {
            if (
              typeof newHouse[key] !== "number" ||
              (newHouse[key] > 0 && newHouse[key] % 1 !== 0)
            )
              errors.push(`${key} must be integer`);
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
            let insertedCur = newHouse[key].toUpperCase();
            !currencies.includes(insertedCur) &&
              errors.push(`${key} must be three letters of existence currency`);
          }
          break;
        case "images":
          {
            let imagesArray = newHouse[key].split(",");
            imagesArray.map(imageURL => {
              !validLink.test(imageURL) &&
                errors.push(
                  `${key} must be list of urls to images, separated with comma`
                );
            });
          }
          break;
        case "sold":
          {
            if (
              typeof newHouse[key] !== "number" ||
              (newHouse[key] !== 0 && newHouse[key] !== 1)
            )
              errors.push(`${key} must be 0 or 1`);
          }
          break;
      }
    });

  if (!errors.length) valid = true;

  console.log("errors: ", errors);
  console.log("valid: ", valid);
  return {
    valid,
    errors,
    raw: newHouse
  };
}

module.exports = { validator, allProperties };
