var Restaurant = require('../../models').Restaurant;
var router = require('express').Router();


router.get('/', function(req, res, next){
	Restaurant.findAll()
	.then(restArray => {
		res.json(restArray);
	});

});
module.exports = router;