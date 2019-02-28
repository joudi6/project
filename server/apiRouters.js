const express = require("express");
const uuidv4 = require("uuidv4");
const db = require("./houses-data.json");
let database = require("./dbConnection");

const api = express.Router();

function hasAllProperties(obj, props) {
  for (let i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i])) return false;

    return true;
  }
}
api.route("/", (req, res) => {
  res.end("api home");
});
api
  .route("/houses")
  .get((req, res) => {
    housesDB.length > 0 ? res.json(housesDB) : res.send("empty database");
  })
  .post((req, res) => {
    let newHouse = [`elia`, 7000, 5];
    if (
      newHouse.constructor === Array
      // &&Object.entries(newHouse).length > 0
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

database.connect();
let query = `insert into houses (owner, price,rooms) values(?)`;

let houseInsertion = connection.query(query, [newHouse]);
async () => {
  try {
    await executeQuery(houseInsertion);
  } catch (err) {
    console.log(err);
  }
};
database.end();

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
