const { Schema } = require('mongoose');
const Application = require('../model');

const promotionApplicationSchema = new Schema({
	recruitmentDate: Date,
	confirmationDate: Date,
	currentRank: String,
	desiredRank: String,
	PhDRegistrationsNumber: String,
	lastPhDRegistrationYear: String,
	teachingActivitiesLink: String,
});

module.exports = Application.discriminator('PromotionApplication', promotionApplicationSchema);