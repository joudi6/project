let mysql = require("mysql");
let connection = mysql.createConnection({
  user: "hyfuser",
  password: "hyfpassword",
  database: "project"
});
const { promisify } = require("util");

// connection.executeQuery = promisify(connection.query);
// const executeQuery = promisify(connection.bind(connection));

// connection.executeQuery = promisify(connection.query);
const queryPromise = promisify(connection.query.bind(connection));

module.exports = {
  connection,
  queryPromise
};
