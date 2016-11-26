var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    foodName: String,
    expiryDate: String,
    description: String,
    image : String
});

mongoose.model('Post', postSchema);