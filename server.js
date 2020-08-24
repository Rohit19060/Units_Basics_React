const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("build"));

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/api/units", (req, res) => {
  let rawdata = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawdata);
  res.json(units.units);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/api/units", function (req, res) {
  let rawdata = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawdata);

  var pdata = JSON.stringify(req.body);
  var x = JSON.parse(pdata);

  x["id"] = units["units"].length + 1;

  units["units"].push(x);
  fs.writeFileSync("server/units.json", JSON.stringify(units), null, 4);
  let rawdata1 = fs.readFileSync("server/units.json");
  let units1 = JSON.parse(rawdata1);
  res.json(units1.units);
});

app.put("/api/units", function (req, res) {
  res.send("Got a PUT request");
});

app.delete("/api/units", function (req, res) {
  let rawdata = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawdata);

  var length = units["units"].length;
  var id = parseInt(req.query.id);

  var x = [];
  for (let i = 0; i < length; i++) {
    if (units["units"][i]["id"] === id) {
      continue;
    }
    x.push(units["units"][i]);
  }
  units["units"] = x;
  fs.writeFileSync("server/units.json", JSON.stringify(units), null, 4);
  let rawdata1 = fs.readFileSync("server/units.json");
  let units1 = JSON.parse(rawdata1);
  res.json(units1.units);
});
