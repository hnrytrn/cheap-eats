var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var foodPost = mongoose.model('FoodPost');
var user = mongoose.model('User');
// Food posts route
router.route('/foodPost')
    // Create food posts
    .post(function(req,res) {
        // Save photo
        var newPost = new foodPost();
        newPost.foodName = req.body.foodName;
        newPost.expiryDate = req.body.expiryDate;
        newPost.description = req.body.description;
        newPost.image = req.body.image;
        newPost.price = req.body.price;
        newPost.retailer = req.body.retailer;
        newPost.postalCode = req.body.postalCode;
        newPost.address = req.body.address;
        newPost.email = req.body.email;

        newPost.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(post);
        });
    })
    //Get all food posts
    .get(function(req, res) {
        foodPost.find(function(err, foodPost) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(foodPost);
        })
    });

//Food specific posts route
router.route('/foodPost/:id') 
    // Get specific food post
	.get(function(req, res){
		foodPost.findById(req.params.id, function(err, post){
			if(err) {
				res.send(err);
            }
			res.json(post);
		});
	}) 
	// Delete a food post
	.delete(function(req, res) {
		foodPost.remove({
			_id: req.params.id
		}, function(err) {
			if (err) {
				res.send(err);
            }
			res.json("deleted :(");
		});
	})
    // Updates a food post
    .put(function(req, res) {
        foodPost.findById(req.params.id, function(err, post) {
            if (err) {
                res.send(err);
            }
            post.foodName = req.body.foodName;
            post.expiryDate = req.body.expiryDate;
            post.description = req.body.description;
            post.image = req.body.image;
            post.price = req.body.price;
            post.retailer = req.body.retailer;
            post.postalCode = req.body.postalCode;
            post.address = req.body.address;
            post.email = req.body.email;

            post.save(function(err, post) {
                if (err) {
                    res.send(err);
                }
                res.json(post);
            });
        });
    });

// Food posts posted by a retailer route
router.route('/retailerFoodPost/:email')
    // Get food posts from specific retailers
    .get(function(req, res) {
        // Find food posts from retailer
        foodPost.find({email: req.params.email}, function(err, post) {
            if (err) {
            return res.send(500, err);
        }
        return res.send(post);
        }); 
    });

// User's favourite retailers route
router.route("/favouriteRetailers/:userID")
    // Get the users favourite retailers
    .get(function(req, res) {
        user.findById(req.params.userID, function(err, customer) {
			if(err) {
				res.send(err);
            }
			res.json(customer);
		});
    })
    // Add a retailer to the user's favourites
    .put(function(req, res) {
        user.findById(req.params.userID, function(err, customer) {
            if (err) {
                res.send(err);
            }
            console.log(customer.favourites);
            customer.favourites.addToSet(req.body.email);
            customer.save(function(err, customer) {
                if (err) {
                    res.send(err);
                }
                res.json(customer);
            })
        })
    })
    // Remove a retailer from the users favourites
    .delete(function(req, res) {
        user.findById(req.params.userID, function(err, customer) {
            if (err) {
                res.send(err);
            }
            // Find the index of the retailer to remove and remove it
            for (var i = 0; i < customer.favourites.length; i++) {
                if (customer.favourites[i] == req.body.email) {
                    customer.favourites.splice(i, 1);
                }
            }
            customer.save(function(err, customer) {
                if (err) {
                    res.send(err);
                }
                res.json(customer);
            })
        })
    });

// User route
router.route("/user/:id")
    // Adds a new user
    .post(function(req,res) {
        // Save photo
        var newUser = new user();
        newUser._id = req.params.id;
        newUser.favourites = [];

        newUser.save(function(err, customer) {
			if (err){
				return res.send(500, err);
			}
			return res.json(customer);
        });
    });

module.exports = router;
