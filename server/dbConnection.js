const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  user: "hyfuser",
  password: "hyfpassword",
  database: "project"
});

const queryPromise = util.promisify(connection.query.bind(connection));
console.log("connected");

module.exports = {
  queryPromise
};
