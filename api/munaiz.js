const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express.Router();

let articles = [];
let blog = `https://munaizahmed.com`;

app.get("/:category", (req, res) => {
  axios
    .get(`${blog}/category/${req.params.category}`)
    .then((response) => {
      let html = response.data;
      let $ = cheerio.load(html); // will let us pick out elements

      $("h2", html).each(function () {
        let title = $(this).text();
        let url = $(this).children().attr("href");

        articles.push({ title, url });
      });
      res.json(articles);
    })
    .catch((err) => console.log("ERRR =>> ", err));
});

module.exports = app;
