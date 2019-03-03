let mysql = require("mysql");
let connection = mysql.createConnection({
  user: "hyfuser",
  password: "hyfpassword",
  database: "project"
});

module.exports = {
  connection
};
