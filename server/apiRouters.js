const express = require("express");
const housesDB = require("./houses-data.json");
let { connection } = require("./dbConnection");
let { validator } = require("./validation");

const api = express.Router();

api.route("/", (req, res) => {
  res.end("api home");
});
api
  .route("/houses")
  .get((req, res) => {
    housesDB.length > 0 ? res.json(housesDB) : res.send("empty database");
  })
  .post(async (req, res) => {
    const processedHouses = req.body.map(house => {
      return validator(house);
    });

    const validData = [];
    const invalidData = [];
    let fields = [];
    processedHouses.forEach(elem => {
      if (elem.valid) {
        userInputFields = Object.keys(elem.raw);
        validData.push(elem);
      } else {
        invalidData.push(elem);
      }
    });
    const report = {
      valid: validData.length,
      invalid: invalidData
    };
    if (validData.length) {
      const fields = `link, market_date, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_living_area, size_rooms, price_value, price_currency, description, title, images, sold`;
      let query = `replace into houses(${fields}) values ?`;
      const houseDataValues = validData.map(house => {
        return Object.values(house.raw);
      });
      try {
        connection.query(query, [houseDataValues]);
        return res.json(report);
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    }
    res.json(report);

    // res.status(400).json({ error: "data should be an array" });
  });

api
  .route("/houses/:id")
  .get((req, res) => {
    const { id } = req.params;
    let house = housesDB.find(house => {
      return house.id === parseInt(id, 10);
    });
    house ? res.json(house) : res.send("no houses with this id");
  })
  .delete((req, res) => {
    const { id } = req.params;
    let newHousesDB = housesDB.filter(house => {
      return house.id !== parseInt(id, 10);
    });
    res.json(newHousesDB);
  });

api.use((req, res) => {
  res.status(400).end("unsupported request");
});

module.exports = api;
