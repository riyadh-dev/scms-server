const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitConfirmationApplication: (_, { input }, context) => Controller.submitConfirmationApplication(input, context),
	},
};