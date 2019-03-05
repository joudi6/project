const express = require("express");
const uuidv4 = require("uuidv4");
const api = express.Router();
const housesDB = require("./houses-data.json");
const { validator, allProperties } = require("./validator");
const { queryPromise } = require("./dbConnection");

const getHouses = (req, res) => {
  housesDB.length > 0 ? res.json(housesDB) : res.send("empty database");
};

const postHouses = (req, res) => {
  let newHouses = req.body;
  if (!Array.isArray(newHouses) || newHouses.length === 0) {
    res.status(400).json({
      error:
        "Empty or invalid dataType, Please Enter your data as array of objects"
    });
  } else {
    newHouses.map(async house => {
      if (typeof house !== "object" || !Object.entries(house).length > 0) {
        res
          .status(400)
          .json(
            "Empty or invalid dataType please enter each house as a json object"
          );
      } else {
        validator(house);
      }

      const insertQuery = `replace into houses(${allProperties}) values (?)`;
      try {
        // await queryPromise(insertQuery, []); //add valid data values
        console.log("query working");
        res.json("newHouses"); ///send report
      } catch (error) {
        console.log(error); /// send json error
      }
    });
  }
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
