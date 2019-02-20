let app = require("./app");

const myPort = 4000;
app.listen(myPort, () => {
  console.log(`listening to port ${myPort}`);
});
