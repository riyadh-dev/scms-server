const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitPromotionApplication: (_, { input }, context) => Controller.submitPromotionApplication(input, context),
	},
};