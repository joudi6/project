const puppeteer = require("puppeteer");
const fs = require("fs");
const housesArray = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.huislijn.nl/koopwoning/nederland/Utrecht");
  const listElements = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("div.objects-row div.wrapper-objects")
    ).map(elem => Array.from(elem.querySelectorAll("h1")))
  );

  console.log("result", listElements);

  fs.appendFile(
    "scrapedData.json",
    JSON.stringify(listElements, null, 2),
    function(err) {
      if (err) throw err;
    }
  );
  await browser.close();
})();
