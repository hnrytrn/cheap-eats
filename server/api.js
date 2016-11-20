var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('Got a GET request for the api');
});


router.put('/', function(req, res, next) {
    res.send('Got a PUT request for the api');
});


router.post('/', function(req, res, next) {
    res.send('Got a POST request for the api');
});


router.delete('/', function(req, res, next) {
    res.send('Got a DELETE request for the api');
});


module.exports = router;
