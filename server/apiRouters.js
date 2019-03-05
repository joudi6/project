const express = require("express");
const uuidv4 = require("uuidv4");
const api = express.Router();
const housesDB = require("./houses-data.json");
const { validator } = require("./validator");
const { queryPromise } = require("./dbConnection");

const getHouses = (req, res) => {
  housesDB.length > 0 ? res.json(housesDB) : res.send("empty database");
};

const postHouses = async (req, res) => {
  let newHouses = req.body;
  if (!Array.isArray(newHouses) || newHouses.length === 0) {
    res.status(400).json({
      error:
        "Empty or invalid dataType, Please Enter your data as array of objects"
    });
  } else {
    newHouses.map(house => {
      if (typeof house !== "object" || !Object.entries(house).length > 0) {
        res
          .status(400)
          .json(
            "Empty or invalid dataType please enter each house as a json object"
          );
      } else {
        res.json("newHouses");
        // if (hasAllProperties(newHouse, ["owner", "rooms", "price"]) === true) {
        //   let { price } = req.body;
        //   let range = /^[0-9]+$/;
        //   if (range.test(price) && price > 0) {
        //     newHouse.id = uuidv4();
        //     housesDB.push(newHouse);
        //     res.json(newHouse);
        //   }
        // res.status(400).end("missing or invalid house details");
        try {
          queryPromise(`replace into houses ( link,
  market_date,
  location_country,
  location_city,
  location_address,
  location_coordinates_lat,
  location_coordinates_lng,
  size_living_area,
  size_rooms,
  price_value,
  price_currency,
  description,
  title,
  images,
  sold )values ?`);
        } catch (error) {}
      }
    });
  }
  // }
};
const getHouseDetails = (req, res) => {
  const { id } = req.params;
  let house = housesDB.find(house => {
    return house.id === parseInt(id, 10);
  });
  house ? res.json(house) : res.send("no houses with this id");
};
const deleteHouse = (req, res) => {
  const { id } = req.params;
  let newHousesDB = housesDB.filter(house => {
    return house.id !== parseInt(id, 10);
  });
  res.json(newHousesDB);
};

api.route("/", (req, res) => {
  res.end("api home");
});
api
  .route("/houses")
  .get(getHouses)
  .post(postHouses);

api
  .route("/houses/:id")
  .get(getHouseDetails)
  .delete(deleteHouse);

api.use((req, res) => {
  res.status(400).end("unsupported request");
});

module.exports = api;
