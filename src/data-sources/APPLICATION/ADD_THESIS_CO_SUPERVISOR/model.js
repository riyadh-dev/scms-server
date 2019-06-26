const { Schema } = require('mongoose');
const Application = require('../model');

const addThesisCoSupervisorApplicationSchema = new Schema({
	firstPhDRegistrationYear: String,
	supervisor: String,
	coSupervisor: String,
	cause: String
});

module.exports = Application.discriminator('AddThesisCoSupervisorApplication', addThesisCoSupervisorApplicationSchema);