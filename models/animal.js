const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
animal_name:String,
animal_breed:{type:String,
    minLength:5,
    maxLength:20},
animal_weight:{type:Number,
    min:2,
    max:1000
}
})
module.exports = mongoose.model("animal",animalSchema)