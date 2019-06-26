const { Schema } = require('mongoose');
const Application = require('../model');

const internshipApplicationSchema = new Schema({
	laboratoryName: String,
	laboratoryWebsite: String,
	country: String,
	city: String,
	durationFrom: Date,
	durationTo: Date,
	workPlanLink: String,
});

module.exports = Application.discriminator('InternshipApplication', internshipApplicationSchema);