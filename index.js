const cors = require("cors");
const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const db = require("./models");



// app.use(cors());

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Route Bazinga!!" });
});

require("./routes/weigh_route")(app);

// set port, listen for requests
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. db ${db.url}`);
});