const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const router = express.Router();

let blog = `https://www.nateliason.com`;

// *** /nat/
router.get("/", async (req, res) => {
  try {
    let { data } = await axios.get(`${blog}/blog`);
    let $ = cheerio.load(data);

    let articles = [];

    $("a", data).each(function () {
      let obj = {};
      if ($(this).attr("class") === "blog-links w-inline-block") {
        obj.title = $(this).children().text();
        obj.url = `${blog}${$(this).attr("class")}`;
        articles.push(obj);
      }
    });

    res.send(articles);
  } catch (error) {
    console.log("ERROR =>", error);
    res.status(400);
  }
});

module.exports = router;
