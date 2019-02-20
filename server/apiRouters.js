const express = require("express");
const uuidv4 = require("uuidv4");
const api = express.Router();
const housesDB = require("./houses-data.json");

function hasAllProperties(obj, props) {
  for (let i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i])) return false;

    return true;
  }
}
api
  .route("/houses")
  .get((req, res) => {
    housesDB.length > 0 ? res.json(housesDB) : res.send("empty database");
  })
  .post((req, res) => {
    let newHouse = req.body;
    if (
      newHouse.constructor === Object &&
      Object.entries(newHouse).length > 0
    ) {
      if (hasAllProperties(newHouse, ["owner", "rooms", "price"]) === true) {
        let { price } = req.body;
        let range = /^[0-9]+$/;
        if (range.test(price) && price > 0) {
          newHouse.id = uuidv4();
          housesDB.push(newHouse);
          res.json(newHouse);
        }
      }
      res.status(400).end("missing or invalid house details");
    }
    res.status(400).end("Empty or invalid dataType");
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
