const express = require("express");

const munaiz = require("./api/munaiz");

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.json("Hello to myFirstAPI api");
});

app.use("/munaiz", munaiz);

app.listen(PORT, () => console.log("Server Running on ", PORT));

module.exports = app;
