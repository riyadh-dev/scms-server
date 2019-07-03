const Controller = require('./controller');

module.exports = {
	Mutation: {
		submitPromotionApplication: (_, { input }, context) => Controller.submitPromotionApplication(input, context),
		reSubmitPromotionApplication: (_, { input }, context) => Controller.reSubmitPromotionApplication(input, context),
	},
};