var Activity = require('../../models').Activity;
var router = require('express').Router();


router.get('/', function(req, res, next){
	Activity.findAll()
	.then(activityarray => {
		res.json(activityarray);
	});

});
module.exports = router;