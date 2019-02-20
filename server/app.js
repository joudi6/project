const express = require("express");
const app = express();

// import api from "./apiRouters";

app.get("/", (req, res) => {
  res.send("i'm working");
});

const myPort = 3000;
app.listen(3000, `listening to port ${myPort}`);
