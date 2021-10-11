const mongoose = require("mongoose");
const weightSchema = require("./weight.model.js").schema; //or wherever post.js is
const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        petId: { type: String, required: true,
            index: {
                unique: true,
            }
        },
        weights: [weightSchema]

    },
    {timestamps: true}
);
return module.exports = mongoose.model("pet", schema);

