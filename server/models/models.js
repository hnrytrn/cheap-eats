var mongoose = require('mongoose');

// Schema for the food posts
var foodPostSchema = new mongoose.Schema({
    foodName: String,
    expiryDate: String,
    description: String,
    image: String,
    price: Number,
    retailer: String,
    postalCode: String,
    address: String,
    email: String
});

// Schema for the users
var userSchema = new mongoose.Schema({
    _id: String,
    favourites: [String]
});

mongoose.model('User', userSchema);
mongoose.model('FoodPost', foodPostSchema);