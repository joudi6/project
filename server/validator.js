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

async function validator(newHouse) {
  let valid = false;
  let errors = [];
  let j = [];
  let validLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  function CheckLocation(newHouse, locationProperties) {
    if (newHouse.hasOwnProperty("location_address")) {
      return true;
    } else if (
      newHouse.hasOwnProperty(
        "location_coordinates_lat" && "location_coordinates_lat"
      )
    ) {
      return true;
    }
  }
  function checkRequiredProps(newHouse, requiredProperties) {
    for (let i = 0; i < requiredProperties.length; i++) {
      if (!newHouse.hasOwnProperty(requiredProperties[i])) {
        errors.push(`${requiredProperties[i]} is required`);
      }
    }
  }
  try {
    await checkRequiredProps(newHouse, requiredProperties);
    (await !CheckLocation(newHouse, locationProperties)) &&
      errors.push(
        `location information must exist please enter location_address or both "location_coordinates_lat" and "location_coordinates_lat" `
      );
    !errors.length &&
      Object.keys(newHouse).forEach(key => {
        switch (key) {
          case "link": {
            if (!validLink.test(newHouse[key])) {
              console.log("link: ");
              errors.push("link should be working url");
            }
            break;
          }
          case "market_date":
            {
              var rightNow = new Date();
              newHouse[key] = rightNow.toISOString().slice(0, 10);
            }
            break;
        }
      });
  } catch {
    errors.push("invalid data!");
    console.log("catching prop");
  }

  console.log("errors: ", errors);
  console.log("valid: ", valid);
  return { valid, errors, raw: newHouse };
}

module.exports = { validator, allProperties };
