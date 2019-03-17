const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 926
  });
  for (let i = 1; i <= 10; i++) {
    const cityLink = `https://www.huislijn.nl/koopwoning/nederland?page=${i}`;
    await page.goto(cityLink);

    let houseData = await page.evaluate(() => {
      let houses = [];
      let housesElms = document.querySelectorAll("div.wrapper-objects a");

      housesElms.forEach(houseElement => {
        let houseObj = {};

        try {
          let elemLink = houseElement.getAttribute("href");
          let linkArr = elemLink.split("/");
          if (elemLink) {
            houseObj.link = elemLink;
            houseObj.market_date = new Date().toISOString().slice(0, 10);
            houseObj.location_country = linkArr[2];
            houseObj.location_city = linkArr[3]
              .split("-")
              .join(" ")
              .trim();
            houseObj.location_address = linkArr[5]
              .split("-")
              .join(" ")
              .trim();
            houseObj.location_coordinates_lat = 0;
            houseObj.location_coordinates_lng = 0;
            houseObj.size_living_area = houseElement
              .querySelector("div.object-type")
              .innerText.split(",")[1]
              .split("/")[0]
              .replace("m2", "")
              .trim();
            houseObj.size_rooms = houseElement
              .querySelector("div.object-type")
              .innerText.split(",")[2]
              .slice(1, 2)
              .trim();
            houseObj.price_value = parseFloat(
              houseElement
                .querySelector("div.object-type")
                .innerText.split(",")[2]
                .split(" ")[3] + 1
            );
            houseObj.price_currency = "EUR";
            houseObj.images = houseElement
              .querySelector(".object-image img")
              .getAttribute("src");
            let sold = houseElement.querySelector(".object-label-sold");
            sold ? (houseObj.sold = 1) : (houseObj.sold = 0);

            houses.push(houseObj);
          }
        } catch (exception) {
          console.log("catching error");
        }
      });
      return houses;
    });

    fs.appendFile(
      "scrapedData.json",
      JSON.stringify(houseData, null, 2),
      function(err) {
        if (err) throw err;
      }
    );
    console.log(houseData.length);
  }
  await browser.close();
})();
