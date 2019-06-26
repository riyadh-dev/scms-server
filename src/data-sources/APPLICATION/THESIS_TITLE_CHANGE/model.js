const { Schema } = require('mongoose');
const Application = require('../model');

const thesisTitleChangeApplicationSchema = new Schema({
	firstPhDRegistrationYear: String,
	supervisor: String,
	currentTitle: String,
	desiredTitle: String,
	cause: String
});

module.exports = Application.discriminator('ThesisTitleChangeApplication', thesisTitleChangeApplicationSchema);