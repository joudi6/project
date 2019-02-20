const express = require("express");
const apiRouter = require("./apiRouters");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", apiRouter);

module.exports = app;
