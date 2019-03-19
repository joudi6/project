const express = require("express");
const api = express.Router();
const housesDB = require("./houses-data.json");
const { validator } = require("./validator");
const { queryPromise } = require("./dbConnection");

const getHouses = async (req, res) => {
  let {
    price_min = 0,
    price_max = 1000000,
    sort = "location_country_asc",
    location_country = "",
    page = 1
  } = req.query;

  price_min = parseInt(price_min, 10);
  if (Number.isNaN(price_min) || price_min < 0) {
    return res.status(400).json({
      error: `Price_min must be positive number `
    });
  }
  price_max = parseInt(price_max, 10);
  if (Number.isNaN(price_max) || price_max <= 0) {
    return res.status(400).json({
      error: `price_max must be positive number `
    });
  }
  if (price_max < price_min) {
    return res.status(400).json({
      error: `price_min must be less than price_max `
    });
  }

  page = parseInt(page, 10);
  if (Number.isNaN(page) || page <= 0) {
    return res.status(400).json({
      error: `page must be more than 0`
    });
  }
  const index = sort.lastIndexOf("_");
  let sort_direction, sort_field;

  if (index > 0) {
    sort_field = sort.slice(0, index);
    sort_direction = sort.slice(index + 1);
    if (["asc", "desc"].indexOf(sort_direction) === -1) {
      return res.status(400).json({
        error: `incorrect ${sort} params`
      });
    }
  } else {
    return res.status(400).json({
      error: `incorrect ${sort} params`
    });
  }
  const houses_per_page = 4;
  const offset = (page - 1) * houses_per_page;
  const conditions = [`(price_value between ? and ?)`];
  const params = [price_min, price_max];
  if (location_country.length) {
    conditions.push(`location_country = ?`);
    params.push(location_country);
  }

  const queryBody = `from houses where ${conditions.join(" and ")}`;

  const queryTotal = `select count(id) as total ${queryBody}`;

  const queryItems = `select * ${queryBody}
  order by ${sort_field} ${sort_direction}
  limit ${houses_per_page} offset ${offset}`;
  try {
    const total = await queryPromise(queryTotal, params);
    const houses = await queryPromise(queryItems, params);

    houses
      ? res.json({
          total: total[0].total,
          houses,
          perPage: houses_per_page
        })
      : res.json("empty database");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postHouses = async (req, res) => {
  let newHouses = req.body;
  if (!Array.isArray(newHouses) || newHouses.length === 0) {
    res.status(400).json({
      error:
        "Empty or invalid dataType, Please Enter your data as array of objects"
    });
  } else {
    let processedHouses = newHouses.map(house => {
      return validator(house);
    });
    const validData = [];
    const invalidData = [];
    let validHouseValues = [];
    let validProperties = [];
    processedHouses.forEach(element => {
      if (element.valid) {
        validProperties = Object.keys(element.raw);
        validData.push(element);
        validHouseValues.push(Object.values(element.raw));
      } else {
        invalidData.push(element);
      }
    });
    const report = {
      valid: validData.length,
      invalid: invalidData
    };
    if (validData.length) {
      const insertQuery = `replace into houses(${validProperties}) values ?`;

      try {
        await queryPromise(insertQuery, [validHouseValues]);
        return res.json(report);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.json(report);
    }
  }
};
const getHouseDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await queryPromise(`select * from houses where id = ${id}`);
    house ? res.json(house) : res.json("no house with this id");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
