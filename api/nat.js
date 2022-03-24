const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const router = express.Router();

let titleHTML = [];
let blog = `https://www.nateliason.com`;

router.get("/", (req, res) => {
  axios
    .get(`${blog}/blog`)
    .then((response) => {
      let html = response.data;
      let $ = cheerio.load(html);

      $("a", html).each(function () {
        if ($(this).attr("class") === "blog-links w-inline-block") {
          let title = $(this).children().text();
          let url = `${blog}${$(this).attr("class")}`;

          titleHTML.push({ url, title });
        }
      });
      res.json(titleHTML);
    })
    .catch((err) => console.log("ERR => ", err));
});

module.exports = router;
