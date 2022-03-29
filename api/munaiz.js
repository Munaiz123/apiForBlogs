const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express.Router();

// let articles = [];
let blog = `https://munaizahmed.com`;

app.get("/:category", async (req, res) => {
  try {
    let { data } = await axios.get(`${blog}/category/${req.params.category}`);
    let $ = cheerio.load(data);

    let articles = [];
    $("h2", data).each(function () {
      let obj = {};
      obj.title = $(this).text();
      obj.url = $(this).children().attr("href");

      articles.push(obj);
    });

    res.send(articles);
  } catch (error) {
    console.log("ERROR =>", error);
    res.status(400);
  }

  // axios
  //   .get(`${blog}/category/${req.params.category}`)
  //   .then((response) => {
  //     let html = response.data;
  //     let $ = cheerio.load(html); // will let us pick out elements

  //     $("h2", html).each(function () {
  //       let title = $(this).text();
  //       let url = $(this).children().attr("href");

  //       articles.push({ title, url });
  //     });
  //     res.json(articles);
  //   })
  //   .catch((err) => console.log("ERRR =>> ", err));
});

module.exports = app;
