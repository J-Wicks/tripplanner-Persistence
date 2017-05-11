var Day = require('../../models').Day;
var router = require('express').Router();
var DayRestaurant = require('../../models').DayRestaurant;
var DayActivity = require('../../models').DayActivity;
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

router.get('/', function(req, res, next){
	Day.findAll({include:[Hotel, Restaurant, Activity], order: 'number ASC' })
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

router.put('/:dayId/:number', function(req, res, next){
	 Day.update({number: req.params.number}, {where: {id: req.params.dayId}})
	 .then(function(result){
	 	res.json(result);
	 }).catch(next);

});

router.delete('/:day', function(req, res, next){
	Day.destroy({where: {number: req.params.day}})
	.then((day) => {
		// Day.update({number: this.number - 1}, {where: { number : {$gt: req.params.day} }});
		res.status(200).send('Deleted Element');
	});

});

router.post('/:id', function(req, res, next){
	Day.create({number: req.params.id})
	.then((day) => {
		res.status(200).send(day);
	});

});

router.post('/:dayNum/restaurant/:restaurantID', function(req, res, next){
	Day.findOne({where: {number: req.params.dayNum}})
	.then((day) => {
		return DayRestaurant.create({dayId: day.id, restaurantId: req.params.restaurantID});
	})
	.then((result) => {
		res.json(result);
	}).catch(next);

});

router.post('/:dayNum/activity/:activityID', function(req, res, next){
	Day.findOne({where: {number: req.params.dayNum}})
	.then((day) => {
		return DayActivity.create({dayId: day.id, activityId: req.params.activityID});
	})
	.then((result) => {
		res.json(result);
	}).catch(next);

});

router.post('/:dayNum/hotel/:hotelID', function(req, res, next){
	Day.update({hotelId: req.params.hotelID}, {where: {number: req.params.dayNum}})
	.then(dayRow => res.json(dayRow));

});

router.delete('/:dayNum/:type/:attractionId', function(req, res, next){
	if (req.params.type === 'hotel'){
		Day.update({hotelId: null}, {where: {number: req.params.dayNum}})
		.then((result) => res.json(result));
	}
	else if(req.params.type === 'restaurant'){
		Day.findOne({where: {number: req.params.dayNum}})
		.then((day) => {
			return DayRestaurant.destroy({where: {dayId: day.id, restaurantId: req.params.attractionId}});
			})
		.then(function(result){
			res.json(result);
		});
	}
	else if (req.params.type === 'activity'){
		Day.findOne({where: {number: req.params.dayNum}})
		.then((day) => {
			return DayActivity.destroy({where: {dayId: day.id, activityId: req.params.attractionId}});
			})
		.then(function(result){
			res.json(result);
		});
	}
});

module.exports = router;