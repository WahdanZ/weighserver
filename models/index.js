const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pet = require("./pet.model.js");
db.weights = require("./weight.model.js");

module.exports = db;