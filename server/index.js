const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(
  keys.mongo,
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Connected to ${db.db.databaseName}`);
    }
  }
);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // Like main.js or main.css
  app.use(express.static("client/build"));

  const path = require("path").default;

  // Express will serve up index.html
  // If it doesn't recognize route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
