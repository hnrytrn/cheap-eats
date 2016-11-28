var mongoose = require('mongoose');

var foodPostSchema = new mongoose.Schema({
    foodName: String,
    expiryDate: String,
    description: String,
    image: String,
    retailer: String,
    postalCode: String,
    address: String
});

mongoose.model('FoodPost', foodPostSchema);