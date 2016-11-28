var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var foodPost = mongoose.model('FoodPost');
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
    	//gets specified post
	.get(function(req, res){
		foodPost.findById(req.params.id, function(err, post){
			if(err) {
				res.send(err);
            }
			res.json(post);
		});
	}) 
	//deletes the post
	.delete(function(req, res) {
		foodPost.remove({
			_id: req.params.id
		}, function(err) {
			if (err) {
				res.send(err);
            }
			res.json("deleted :(");
		});
	});

module.exports = router;
