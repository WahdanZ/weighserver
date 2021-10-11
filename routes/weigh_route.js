module.exports = app => {
    const weights = require("../controllers/weight.controller.js");

    const router = require("express").Router({mergeParams: true});

    // Create a new weight
    router.post("/", weights.create);

    // Retrieve all Tutorials
    router.get("/", weights.findAll);


    app.use("/api/:petId/weights", router);
};