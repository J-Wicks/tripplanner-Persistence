var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day');

var DayRestaurant = db.define('day_restaurant', {});
var DayActivity = db.define('day_activity', {});

Day.belongsTo(Hotel);

Day.belongsToMany(Restaurant, {through: DayRestaurant});
// Restaurant.belongsToMany(Day, {through: DayRestaurant});

Day.belongsToMany(Activity, {through: DayActivity});
// Activity.belongsToMany(Day, {through: DayActivity});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
	db,
	Place,
	Hotel,
	Restaurant,
	Activity,
	Day,
	DayRestaurant,
	DayActivity
};
