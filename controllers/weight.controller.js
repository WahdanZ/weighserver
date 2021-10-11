const db = require("../models");
const Weight = db.weights;
const Pet = db.pet;

// Create and Save a new Weight
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    let petId = req.params.petId;
    if (!petId) {
        res.status(400).send({message: "Pet Not Found "});
    }
    const weight = new Weight({
        date: req.body.date,
        weight: req.body.weight,
    });
    var condition =  { petId: { $regex: new RegExp(petId), $options: "i" } };

    Pet.findOne(condition).then(pet => {
        if (!pet){
             pet = new Pet({
                 petId:petId,
                name:`Pet ${petId}`,
                weights : [weight]
            })
        }
        else {
            pet.weights.push(weight);
            pet.markModified('weights');
        }
        pet.save().then(pet => res.send(pet)).catch(err =>{
            console.log('error in function abc: ' + err + ' whilst doing xyz')

        res
            .status(500)
            .send({message: "Error retrieving Weight for Pet " + petId})})
         })
        .catch(err => {
            console.log('error in function abc: ' + err + ' whilst doing xyz');
            res
                .status(500)
                .send({message: "Error Saving Weight for Pet id=" + petId});
        });


};

// Retrieve all Weight from the database.
exports.findAll = (req, res) => {
    let petId = req.params.petId;
    if (!petId) {
        res.status(400).send({message: "Pet Not Found "});
    }
    let condition = {petId: {$regex: new RegExp(petId), $options: "i"}};


    Pet.findOne(condition)
        .then(data => {
            if(data){
            res.send(data);
            }else{
                res.send({
                    petId:petId,
                   name:`Pet ${petId}`,
                   weights : []
               }); 
            }
        })
        .catch(err => {
            res.send({
                petId:petId,
               name:`Pet ${petId}`,
               weights : []
           });
        });
};



