const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  user: "hyfuser",
  password: "hyfpassword",
  database: "project"
});
const queryPromise = util.promisify(connection.query.bind(connection));
console.log("db connected successfully");

module.exports = {
  queryPromise,
  connection
};
