let mongoose = require("mongoose");

let postDetailsSchema = new mongoose.Schema({
    image: String,
    author: String,
    location: String,
    description: String
})

mongoose.model("postDetails", postDetailsSchema);