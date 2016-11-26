var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    foodName: String,
    expiryDate: String,
    description: String,
    // image : {
    //     data: Buffer,
    //     contentType: String
    // }
});

mongoose.model('Post', postSchema);