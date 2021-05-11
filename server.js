const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "build")));

const SECRET = "This is my Secret";

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname + "/build/index.html"));
// });

app.get("/api/units", (req, res) => {
  let rawData = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawData);
  res.json(units.units);
});

app.listen(port, () => {
  console.log(`Server Started listening at http://localhost:${port}/`);
});

app.post("/api/units", function (req, res) {
  let rawData = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawData);

  var pData = JSON.stringify(req.body);
  var x = JSON.parse(pData);

  x["id"] = units["units"].length + 1;

  units["units"].push(x);
  fs.writeFileSync("server/units.json", JSON.stringify(units), null, 4);
  let rawData1 = fs.readFileSync("server/units.json");
  let units1 = JSON.parse(rawData1);
  res.json(units1.units);
});

app.put("/api/units", function (req, res) {
  res.send("Got a PUT request");
});

app.delete("/api/units", function (req, res) {
  let rawData = fs.readFileSync("server/units.json");
  let units = JSON.parse(rawData);

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
  let rawData1 = fs.readFileSync("server/units.json");
  let units1 = JSON.parse(rawData1);
  res.json(units1.units);
});

const getUser = (username) => {
  let rawData = fs.readFileSync("server/units.json");
  let data = JSON.parse(rawData);
  return data.users.filter((u) => u.username === username)[0];
};

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = getUser(username);
  // console.log(user);
  if (!user) {
    return res.status(401).json({ error: "invalid username or password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    // console.log("Password is good!");
    const userForToken = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(userForToken, SECRET);
    return res
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } else {
    return res.status(401).json({ error: "invalid username or password" });
  }
});
