const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
animal_name:String,
animal_breed:String,
animal_weight:Number
})
module.exports = mongoose.model("animal",animalSchema)