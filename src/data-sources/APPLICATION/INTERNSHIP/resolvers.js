const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitInternshipApplication: (_, { input }, context) => Controller.submitInternshipApplication(input, context),
	},
};