
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        weight: Number,
        date: Date,
    },
    {timestamps: true}
);
return module.exports = mongoose.model("weight", schema);
