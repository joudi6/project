const requiredProps = [
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
  "price_currency"
];

const validator = newHouseData => {
  let valid = true;
  let errors = [];

  Object.keys(newHouseData).forEach(key => {
    requiredProps.forEach(prop => {
      if (typeof newHouseData !== "object") {
        valid = false;
        errors.push("house should be an object");
      }
      if (typeof newHouseData[prop] === "undefined") {
        valid = false;
        errors.push(`${prop} is required`);
      }
    });
    switch (key) {
      case "link": {
        let link = newHouseData[key];
        let validLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!validLink.test(link)) {
          valid = false;
          errors.push("link should be working url");
        }
        break;
      }
      case "market_date":
        {
          var rightNow = new Date();
          newHouseData[key] = rightNow.toISOString().slice(0, 10);
        }
        break;
      case "location_address":
        {
          if (typeof newHouseData[key] !== "string") {
            valid = false;
            errors.push("address should be a text");
          }
        }
        break;
      case "location_coordinates_lat":
        {
          if (typeof newHouseData[key] !== "number") {
            valid = false;
            errors.push("location should be a float number");
          }
        }
        break;
      case "location_coordinates_lng":
        {
          if (typeof newHouseData[key] !== "number") {
            valid = false;
            errors.push("location should be a float number");
          }
        }
        break;
      case "size_living_area":
        {
          if (typeof newHouseData[key] !== "number") {
            valid = false;
            errors.push("area should be a float number");
          }
        }
        break;
      case "size_rooms":
        {
          if (typeof newHouseData[key] !== "number") {
            valid = false;
            errors.push("rooms should be integer number");
          }
        }
        break;
      case "price":
        {
          let price = newHouseData[key];
          let range = /^[0-9]+$/;
          if (typeof price !== "number" || !range.test(price) || price < 0) {
            valid = false;
            errors.push("price should be a positive number");
          }
        }
        break;
      case "price_currency":
        {
          let currency = newHouseData[key];
          if (currency.length !== 3) {
            valid = false;
            errors.push("currency should be 3 characters ");
          }
        }
        break;
      case "images":
        {
          let links = newHouseData[key];
          var array = "[" + links + "]";
          let validLink = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
          if (!validLink.test(array)) {
            valid = false;
            errors.push("images should be working url separated with comma");
          }
        }
        break;
      case "sold":
        {
          let num = newHouseData[key];
          let range = /^[0-1]$/;
          if (typeof num !== "number" || !range.test(num)) {
            valid = false;
            errors.push("sold should be 0 or 1");
          }
        }
        break;
      default:
        valid = true;
    }
  });

  return {
    valid,
    errors,
    raw: newHouseData
  };
};

module.exports = {
  validator
};
