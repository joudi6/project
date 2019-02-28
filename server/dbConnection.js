let mysql = require("mysql");
let connection = mysql.createConnection({
  user: "hyfuser",
  password: "hyfpassword",
  database: "project"
});
const { promisify } = require("util");
const executeQuery = promisify(connection.query);

// let data = [`elia`, 7000, 5];
// let houseInsertion = connection.query(
//   `insert into houses (owner, price,rooms) values(?)`,
//   [data]
// );
// async () => {
//   try {
//     await executeQuery(houseInsertion);
//   } catch (err) {
//     console.log(err);
//   }
// };
module.exports = { connection, executeQuery };
