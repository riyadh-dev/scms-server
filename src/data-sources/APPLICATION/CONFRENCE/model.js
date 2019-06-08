const { Schema } = require('mongoose');
const Application = require('../model');

const confrenceApplicationSchema = new Schema({
	name: String,	
	communicationPaper: {
		title: String,
		abstract: String,
	},
	location: String,
	date: Date,
	website: String,
});

module.exports = Application.discriminator('ConfrenceApplication', confrenceApplicationSchema);
