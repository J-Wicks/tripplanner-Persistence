var Day = require('../../models').Day;
var router = require('express').Router();
var DayRestaurant = require('../../models').day_restaurants
var DayActivity = require('../../models').day_activities

router.get('/', function(req, res, next){
	Day.findAll()
	.then(dayArray=> {
		res.json(dayArray);
	});

});

router.get('/:day', function(req, res, next){
	Day.findOne({where: {number: req.params.day}})
	.then((day) => {
		res.json(day);
	});

});


router.delete('/:day', function(req, res, next){
	Day.destroy({where: {number: req.params.day}})
	.then((day) => {
		res.status(200).send('Deleted Element');
	});

});

router.post('/:id', function(req, res, next){
	Day.create({number: req.params.id})
	.then((day) => {
		res.status(200).send(day);
	});

});

router.post('/:id/restaurants', function(req, res, next){


});

router.post('/:id/activities', function(req, res, next){


});

router.post('/:id/hotels', function(req, res, next){


});

module.exports = router;