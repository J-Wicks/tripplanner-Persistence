var Hotel = require('../../models').Hotel;
var router = require('express').Router();


router.get('/', function(req, res, next){
	Hotel.findAll()
	.then(hotelarray => {
		res.json(hotelarray);
	});

});
module.exports = router;