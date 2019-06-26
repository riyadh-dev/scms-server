const { Schema } = require('mongoose');
const Application = require('../model');

const confirmationApplicationSchema = new Schema({
	rank: String,
	recruitmentDate: Date,
	teachingActivitiesLink: String,
});

module.exports = Application.discriminator('ConfirmationApplication', confirmationApplicationSchema);